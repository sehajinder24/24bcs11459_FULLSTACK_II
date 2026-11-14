import React, { useEffect, useState } from 'react';
import { api, fmtSize, fmtNum } from './utils.js';
import TreeView from './TreeView.jsx';
import Treemap from './Treemap.jsx';
import Search from './Search.jsx';
import Types from './Types.jsx';

const TABS = { tree: 'Directory tree', map: 'Treemap', types: 'File types', search: 'Search' };

export default function App() {
  const [scans, setScans] = useState([]);
  const [scan, setScan] = useState(null);
  const [path, setPath] = useState('');
  const [tab, setTab] = useState('tree');
  const [err, setErr] = useState('');

  const refresh = () => api('/scans').then(setScans);
  useEffect(() => { refresh(); }, []);
  useEffect(() => {
    if (!scan || scan.status !== 'running') return;
    const t = setInterval(async () => { const s = await api('/scans/' + scan._id); setScan(s); if (s.status !== 'running') refresh(); }, 1000);
    return () => clearInterval(t);
  }, [scan]);

  const start = async (e) => {
    e.preventDefault(); setErr('');
    try { setScan(await api('/scans', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ path }) })); refresh(); }
    catch (ex) { setErr(ex.message); }
  };
  const remove = async (s) => { await api('/scans/' + s._id, { method: 'DELETE' }); if (scan?._id === s._id) setScan(null); refresh(); };

  return (
    <div className="app">
      <aside>
        <h1>DiskView</h1>
        <p className="muted">Read-only view of what is using your storage.</p>
        <form onSubmit={start}>
          <label htmlFor="p">Drive or folder to scan</label>
          <input id="p" value={path} onChange={(e) => setPath(e.target.value)} placeholder="R:\  or  /mnt/external" />
          <button className="primary" disabled={!path}>Scan</button>
          {err && <p className="err" role="alert">{err}</p>}
        </form>
        <h2>Previous scans</h2>
        <ul className="scans">
          {scans.map((s) => (
            <li key={s._id} className={scan?._id === s._id ? 'sel' : ''}>
              <button onClick={() => setScan(s)}><b>{s.rootPath}</b><small>{s.status === 'done' ? fmtSize(s.totalSize) : s.status} · {new Date(s.startedAt).toLocaleDateString()}</small></button>
              <button className="x" onClick={() => remove(s)} aria-label={`Delete saved scan of ${s.rootPath}`} title="Removes the saved index only; your drive is untouched">×</button>
            </li>
          ))}
          {!scans.length && <li className="muted">No scans yet. Enter a path above.</li>}
        </ul>
      </aside>
      <main>
        {!scan && <div className="empty"><h2>Pick a drive to see where the space went</h2><p>Scans only read file names, sizes and dates. File contents are never opened and nothing is changed.</p></div>}
        {scan && (
          <>
            <header>
              <div><h2>{scan.rootPath}</h2>
                <p className="muted">{scan.status === 'running' ? `Scanning… ${fmtNum(scan.files)} files, ${fmtNum(scan.folders)} folders found` :
                  scan.status === 'error' ? `Scan failed: ${scan.error}` :
                  `${fmtSize(scan.totalSize)} in ${fmtNum(scan.files)} files and ${fmtNum(scan.folders)} folders${scan.skipped ? ` · ${scan.skipped} items unreadable` : ''}`}</p></div>
              <div className="tabs" role="tablist">{Object.entries(TABS).map(([k, v]) => <button key={k} role="tab" aria-selected={tab === k} onClick={() => setTab(k)}>{v}</button>)}</div>
            </header>
            {scan.status === 'done' && (tab === 'tree' ? <TreeView scan={scan} /> : tab === 'map' ? <Treemap scan={scan} /> : tab === 'types' ? <Types scan={scan} /> : <Search scan={scan} />)}
            {scan.status === 'running' && <div className="progress"><i /></div>}
          </>
        )}
      </main>
    </div>
  );
}
