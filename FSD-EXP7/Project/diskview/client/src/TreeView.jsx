import React, { useEffect, useState } from 'react';
import { api, qs, fmtSize, fmtDate, fmtNum, groupOf, nextSort } from './utils.js';
import { SortHead, Chip } from './components.jsx';

function Rows({ scanId, path, parentSize, depth, sort }) {
  const [items, setItems] = useState(null);
  const [open, setOpen] = useState({});
  useEffect(() => { api(`/scans/${scanId}/children?${qs({ path, ...sort })}`).then((d) => setItems(d.items)); }, [scanId, path, sort]);
  if (!items) return <tr><td colSpan="6" className="muted" style={{ paddingLeft: 12 + depth * 18 }}>Loading…</td></tr>;
  return items.map((n) => {
    const pct = parentSize ? (n.size / parentSize) * 100 : 0;
    return (
      <React.Fragment key={n.path}>
        <tr>
          <td style={{ paddingLeft: 12 + depth * 18 }}>
            <div className="name">
              {n.isDir
                ? <button className="twisty" aria-label={open[n.path] ? 'Collapse' : 'Expand'} onClick={() => setOpen({ ...open, [n.path]: !open[n.path] })}>{open[n.path] ? '▾' : '▸'}</button>
                : <span className="twisty" />}
              <Chip group={groupOf(n)} /><span title={n.path}>{n.name}</span>
            </div>
          </td>
          <td className="r num">{fmtSize(n.size)}</td>
          <td className="bar"><i style={{ width: pct + '%' }} className={`g-${groupOf(n)}`} /><b>{pct.toFixed(1)}%</b></td>
          <td className="r num">{n.isDir ? fmtNum(n.files) : ''}</td>
          <td className="r num">{n.isDir ? fmtNum(n.folders) : ''}</td>
          <td className="num">{fmtDate(n.mtime)}</td>
        </tr>
        {n.isDir && open[n.path] && <Rows scanId={scanId} path={n.path} parentSize={n.size} depth={depth + 1} sort={sort} />}
      </React.Fragment>
    );
  });
}

export default function TreeView({ scan }) {
  const [sort, setSort] = useState({ sort: 'size', dir: 'desc' });
  const onSort = (col) => setSort(nextSort(sort, col));
  const h = { sort, onSort };
  return (
    <div className="tablewrap">
      <table>
        <thead><tr>
          <SortHead label="Name" col="name" {...h} /><SortHead label="Size" col="size" right {...h} />
          <th><span className="th">% of parent</span></th><SortHead label="Files" col="files" right {...h} />
          <SortHead label="Folders" col="folders" right {...h} /><SortHead label="Modified" col="mtime" {...h} />
        </tr></thead>
        <tbody><Rows scanId={scan._id} path={scan.rootPath} parentSize={scan.totalSize} depth={0} sort={sort} /></tbody>
      </table>
    </div>
  );
}
