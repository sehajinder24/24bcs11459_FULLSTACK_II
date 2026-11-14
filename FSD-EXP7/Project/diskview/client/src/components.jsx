import React from 'react';
export const SortHead = ({ label, col, sort, onSort, right }) => (
  <th className={right ? 'r' : ''} aria-sort={sort.sort === col ? (sort.dir === 'asc' ? 'ascending' : 'descending') : 'none'}>
    <button className="th" onClick={() => onSort(col)}>{label}{sort.sort === col ? (sort.dir === 'asc' ? ' ▲' : ' ▼') : ''}</button>
  </th>
);
export const Chip = ({ group }) => <span className={`chip g-${group}`} />;
