import React, { useEffect, useMemo, useRef, useState } from 'react';
import { api, qs, fmtSize, groupOf } from './utils.js';

// Squarified treemap (Bruls et al.)
function squarify(items, x, y, w, h) {
  const total = items.reduce((s, i) => s + i.size, 0);
  if (!total) return [];
  const scale = (w * h) / total, out = [];
  let rest = items.map((i) => ({ ...i, area: i.size * scale }));
  const worst = (row, side) => {
    const s = row.reduce((a, b) => a + b.area, 0);
    const mx = Math.max(...row.map((r) => r.area)), mn = Math.min(...row.map((r) => r.area));
    return Math.max((side * side * mx) / (s * s), (s * s) / (side * side * mn));
  };
  while (rest.length) {
    const side = Math.min(w, h), row = [rest[0]];
    let i = 1;
    while (i < rest.length && worst([...row, rest[i]], side) <= worst(row, side)) row.push(rest[i++]);
    rest = rest.slice(row.length);
    const s = row.reduce((a, b) => a + b.area, 0);
    if (w >= h) { const rw = s / h; let cy = y; row.forEach((r) => { const rh = r.area / rw; out.push({ ...r, x, y: cy, w: rw, h: rh }); cy += rh; }); x += rw; w -= rw; }
    else { const rh = s / w; let cx = x; row.forEach((r) => { const rw = r.area / rh; out.push({ ...r, x: cx, y, w: rw, h: rh }); cx += rw; }); y += rh; h -= rh; }
  }
  return out;
}

export default function Treemap({ scan }) {
  const [path, setPath] = useState(scan.rootPath);
  const [items, setItems] = useState([]);
  const [hover, setHover] = useState(null);
  const box = useRef(null);
  const [dim, setDim] = useState({ w: 900, h: 520 });
  useEffect(() => { setPath(scan.rootPath); }, [scan._id]);
  useEffect(() => { api(`/scans/${scan._id}/children?${qs({ path, sort: 'size', dir: 'desc' })}`).then((d) => setItems(d.items.filter((i) => i.size > 0).slice(0, 300))); }, [scan._id, path]);
  useEffect(() => { if (box.current) setDim({ w: box.current.clientWidth, h: 520 }); }, [items]);
  const rects = useMemo(() => squarify(items, 0, 0, dim.w, dim.h), [items, dim]);
  const sep = scan.rootPath.includes('\\') ? '\\' : '/';
  const rootTrim = scan.rootPath.replace(/[\\/]$/, '');
  const crumbs = path.slice(rootTrim.length).split(/[\\/]/).filter(Boolean);
  const up = (n) => setPath(n < 0 ? scan.rootPath : rootTrim + sep + crumbs.slice(0, n + 1).join(sep));
  return (
    <div>
      <nav className="crumbs">
        <button onClick={() => up(-1)}>{scan.rootPath}</button>
        {crumbs.map((c, i) => <button key={i} onClick={() => up(i)}>{c}</button>)}
      </nav>
      <div className="treemap" ref={box} style={{ height: dim.h }}>
        {rects.map((r) => (
          <div key={r.path} className={`tm g-${groupOf(r)} ${r.isDir ? 'dir' : ''}`}
            style={{ left: r.x, top: r.y, width: r.w, height: r.h }}
            onMouseEnter={() => setHover(r)} onMouseLeave={() => setHover(null)}
            onClick={() => r.isDir && setPath(r.path)}>
            {r.w > 56 && r.h > 20 && <span>{r.name}</span>}
          </div>
        ))}
      </div>
      <p className="hint">{hover ? `${hover.path} — ${fmtSize(hover.size)}${hover.isDir ? ` · ${hover.files} files` : ''}` : 'Click a folder to zoom in. Colour shows file type.'}</p>
    </div>
  );
}
