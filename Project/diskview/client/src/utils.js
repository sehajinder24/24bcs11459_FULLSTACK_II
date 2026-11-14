export const api = async (url, opts) => {
  const res = await fetch('/api' + url, opts);
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Request failed');
  return data;
};
export const qs = (o) => new URLSearchParams(Object.entries(o).filter(([, v]) => v !== '' && v != null)).toString();
export const fmtSize = (b = 0) => {
  if (b < 1024) return b + ' B';
  const u = ['KB', 'MB', 'GB', 'TB']; let i = -1;
  do { b /= 1024; i++; } while (b >= 1024 && i < 3);
  return b.toFixed(b >= 100 ? 0 : 1) + ' ' + u[i];
};
export const fmtDate = (d) => (d ? new Date(d).toLocaleString() : '');
export const fmtNum = (n = 0) => n.toLocaleString();
const GROUPS = {
  video: 'mp4 mkv avi mov wmv webm', audio: 'mp3 wav flac aac ogg m4a',
  image: 'jpg jpeg png gif bmp webp svg raw heic tif tiff psd', archive: 'zip rar 7z tar gz iso bz2',
  doc: 'pdf doc docx xls xlsx ppt pptx txt md csv', code: 'js jsx ts py java c cpp cs go rs html css json xml',
  app: 'exe dll msi sys bin apk dmg',
};
export const groupOf = (n) => {
  if (n.isDir) return 'folder';
  for (const [g, list] of Object.entries(GROUPS)) if (list.split(' ').includes(n.ext)) return g;
  return 'other';
};
export const nextSort = (cur, col) => ({ sort: col, dir: cur.sort === col && cur.dir === 'desc' ? 'asc' : 'desc' });
