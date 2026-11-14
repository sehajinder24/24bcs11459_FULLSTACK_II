import { Router } from 'express';
import mongoose from 'mongoose';
import fs from 'fs/promises';
import path from 'path';
import { Scan, Node } from './models.js';
import { runScan } from './scanner.js';

const r = Router();
const wrap = (fn) => (req, res) => fn(req, res).catch((e) => res.status(500).json({ error: e.message }));
const SORT = { name: 'name', size: 'size', files: 'files', folders: 'folders', mtime: 'mtime', ext: 'ext', path: 'path' };
const sortOf = (q) => ({ [SORT[q.sort] || 'size']: q.dir === 'asc' ? 1 : -1, _id: 1 });
const collation = { locale: 'en', numericOrdering: true, strength: 2 };
const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

r.get('/scans', wrap(async (_, res) => res.json(await Scan.find().sort({ startedAt: -1 }).limit(30))));
r.get('/scans/:id', wrap(async (req, res) => res.json(await Scan.findById(req.params.id))));

r.post('/scans', wrap(async (req, res) => {
  const root = path.resolve(String(req.body.path || ''));
  const allowed = (process.env.ALLOWED_ROOTS || '').split(',').map((s) => s.trim()).filter(Boolean)
    .map((s) => path.resolve(s).toLowerCase());
  if (allowed.length && !allowed.some((a) => root.toLowerCase().startsWith(a)))
    return res.status(403).json({ error: 'Path is outside ALLOWED_ROOTS' });
  let st;
  try { st = await fs.stat(root); } catch { return res.status(400).json({ error: 'Path not found on the server machine' }); }
  if (!st.isDirectory()) return res.status(400).json({ error: 'Path is not a folder' });
  const scan = await Scan.create({ rootPath: root });
  runScan(scan);                                   // runs in background
  res.status(202).json(scan);
}));

// Deletes the stored index only. The drive is never modified.
r.delete('/scans/:id', wrap(async (req, res) => {
  await Node.deleteMany({ scanId: req.params.id });
  await Scan.deleteOne({ _id: req.params.id });
  res.json({ ok: true });
}));

r.get('/scans/:id/children', wrap(async (req, res) => {
  const scan = await Scan.findById(req.params.id);
  const parentPath = req.query.path || scan.rootPath;
  const items = await Node.find({ scanId: scan._id, parentPath }).sort(sortOf(req.query)).collation(collation).limit(1000).lean();
  const self = await Node.findOne({ scanId: scan._id, path: parentPath }).lean();
  res.json({ self, items });
}));

r.get('/scans/:id/search', wrap(async (req, res) => {
  const { q, ext, type, minSize } = req.query;
  const page = Math.max(0, Number(req.query.page) || 0), limit = 100;
  const f = { scanId: req.params.id };
  if (q) f.name = { $regex: esc(q), $options: 'i' };
  if (ext) f.ext = ext.replace('.', '').toLowerCase();
  if (type === 'file') f.isDir = false; else if (type === 'dir') f.isDir = true;
  if (Number(minSize) > 0) f.size = { $gte: Number(minSize) };
  const [items, total] = await Promise.all([
    Node.find(f).sort(sortOf(req.query)).collation(collation).skip(page * limit).limit(limit).lean(),
    Node.countDocuments(f),
  ]);
  res.json({ items, total, page, limit });
}));

r.get('/scans/:id/types', wrap(async (req, res) => {
  const rows = await Node.aggregate([
    { $match: { scanId: new mongoose.Types.ObjectId(req.params.id), isDir: false } },
    { $group: { _id: '$ext', size: { $sum: '$size' }, count: { $sum: 1 } } },
    { $sort: { size: -1 } }, { $limit: 40 },
  ]);
  res.json(rows.map((x) => ({ ext: x._id, size: x.size, count: x.count })));
}));

export default r;
