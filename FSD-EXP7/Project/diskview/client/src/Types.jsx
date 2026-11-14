import React, { useEffect, useState } from 'react';
import { api, fmtSize, fmtNum, groupOf } from './utils.js';

export default function Types({ scan }) {
  const [rows, setRows] = useState([]);
  useEffect(() => { api(`/scans/${scan._id}/types`).then(setRows); }, [scan._id]);
  const max = rows[0]?.size || 1;
  return (
    <div className="tablewrap"><table>
      <thead><tr><th><span className="th">Extension</span></th><th className="r"><span className="th">Size</span></th><th><span className="th">Share of largest</span></th><th className="r"><span className="th">Files</span></th></tr></thead>
      <tbody>{rows.map((r) => (
        <tr key={r.ext}><td>.{r.ext || '(none)'}</td><td className="r num">{fmtSize(r.size)}</td>
          <td className="bar"><i style={{ width: (r.size / max) * 100 + '%' }} className={`g-${groupOf({ ext: r.ext })}`} /></td>
          <td className="r num">{fmtNum(r.count)}</td></tr>
      ))}</tbody>
    </table></div>
  );
}
