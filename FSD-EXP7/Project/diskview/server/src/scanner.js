// READ-ONLY: this file only uses fs.readdir and fs.lstat. Nothing is ever written to the scanned drive.
import fs from 'fs/promises';
import path from 'path';
import { Scan, Node } from './models.js';

export async function runScan(scan) {
  const scanId = scan._id;
  const buf = [];
  const c = { files: 0, folders: 0, skipped: 0 };
  const flush = async (force) => {
    if (buf.length >= 2000 || (force && buf.length)) {
      await Node.insertMany(buf.splice(0), { ordered: false });
    }
  };
  const timer = setInterval(() => Scan.updateOne({ _id: scanId }, c).catch(() => {}), 1000);

  const walk = async (dir, parent, mtime) => {
    let entries;
    try { entries = await fs.readdir(dir, { withFileTypes: true }); }
    catch { c.skipped++; return { size: 0, files: 0, folders: 0 }; }
    let size = 0, files = 0, folders = 0;
    for (let i = 0; i < entries.length; i += 64) {
      await Promise.all(entries.slice(i, i + 64).map(async (e) => {
        const p = path.join(dir, e.name);
        try {
          const st = await fs.lstat(p);
          if (st.isSymbolicLink()) return;               // never follow links
          if (st.isDirectory()) {
            const r = await walk(p, dir, st.mtime);
            size += r.size; files += r.files; folders += r.folders + 1;
          } else if (st.isFile()) {
            buf.push({ scanId, path: p, parentPath: dir, name: e.name, isDir: false, size: st.size,
              files: 0, folders: 0, ext: path.extname(e.name).slice(1).toLowerCase(), mtime: st.mtime });
            size += st.size; files++; c.files++;
          }
        } catch { c.skipped++; }
      }));
      await flush();
    }
    c.folders++;
    buf.push({ scanId, path: dir, parentPath: parent, name: path.basename(dir) || dir, isDir: true,
      size, files, folders, ext: '', mtime });
    return { size, files, folders };
  };

  try {
    const root = await fs.stat(scan.rootPath);
    const r = await walk(scan.rootPath, null, root.mtime);
    await flush(true);
    await Scan.updateOne({ _id: scanId }, { ...c, totalSize: r.size, status: 'done', finishedAt: new Date() });
  } catch (err) {
    await Node.deleteMany({ scanId });
    await Scan.updateOne({ _id: scanId }, { status: 'error', error: err.message });
  } finally { clearInterval(timer); }
}
