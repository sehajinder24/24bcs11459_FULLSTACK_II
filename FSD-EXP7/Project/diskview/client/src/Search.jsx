import React, { useEffect, useState } from 'react';
import { api, qs, fmtSize, fmtDate, nextSort, groupOf } from './utils.js';
import { SortHead, Chip } from './components.jsx';

export default function Search({ scan }) {
  const [f, setF] = useState({ q: '', ext: '', type: '', minMB: '' });
  const [sort, setSort] = useState({ sort: 'size', dir: 'desc' });
  const [page, setPage] = useState(0);
  const [res, setRes] = useState({ items: [], total: 0 });
  useEffect(() => {
    const t = setTimeout(() => {
      api(`/scans/${scan._id}/search?${qs({ q: f.q, ext: f.ext, type: f.type, minSize: f.minMB ? f.minMB * 1048576 : '', ...sort, page })}`).then(setRes);
    }, 250);
    return () => clearTimeout(t);
  }, [scan._id, f, sort, page]);
  const set = (k) => (e) => { setPage(0); setF({ ...f, [k]: e.target.value }); };
  const onSort = (c) => setSort(nextSort(sort, c));
  const h = { sort, onSort };
  return (
    <div>
      <div className="filters">
        <input placeholder="Search file or folder name" value={f.q} onChange={set('q')} aria-label="Name contains" />
        <input placeholder="Extension (e.g. mp4)" value={f.ext} onChange={set('ext')} aria-label="Extension" />
        <select value={f.type} onChange={set('type')} aria-label="Type"><option value="">Files and folders</option><option value="file">Files only</option><option value="dir">Folders only</option></select>
        <input type="number" min="0" placeholder="Min size (MB)" value={f.minMB} onChange={set('minMB')} aria-label="Minimum size in MB" />
      </div>
      <div className="tablewrap"><table>
        <thead><tr><SortHead label="Name" col="name" {...h} /><SortHead label="Path" col="path" {...h} /><SortHead label="Size" col="size" right {...h} /><SortHead label="Type" col="ext" {...h} /><SortHead label="Modified" col="mtime" {...h} /></tr></thead>
        <tbody>{res.items.map((n) => (
          <tr key={n.path}><td><div className="name"><Chip group={groupOf(n)} />{n.name}</div></td><td className="muted path" title={n.path}>{n.parentPath}</td>
            <td className="r num">{fmtSize(n.size)}</td><td>{n.isDir ? 'Folder' : n.ext || '—'}</td><td className="num">{fmtDate(n.mtime)}</td></tr>
        ))}</tbody>
      </table></div>
      <div className="pager">
        <span>{res.total.toLocaleString()} matches</span>
        <button disabled={page === 0} onClick={() => setPage(page - 1)}>Previous</button>
        <button disabled={(page + 1) * 100 >= res.total} onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
}
