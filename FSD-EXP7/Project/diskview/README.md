# DiskView – WizTree for the web (MERN)

Read-only disk usage explorer. A Node scanner walks a drive/folder (only `readdir` + `lstat`, never writes,
deletes or reads file contents), stores the index in MongoDB, and a React UI shows a sortable tree,
a treemap, file-type breakdown and file search.

## Important
The scanner runs on the machine where the **server** runs, so run it on the computer that has the drive (e.g. `R:\`).
Optionally restrict what can be scanned with `ALLOWED_ROOTS` in `server/.env`.

## Run
1. Start MongoDB locally (or use Atlas).
2. Server:  `cd server && cp .env.example .env && npm install && npm run dev`   (http://localhost:5000)
3. Client:  `cd client && npm install && npm run dev`                           (http://localhost:5173)
4. Enter a path such as `R:\` (Windows) or `/mnt/external` and press **Scan**.

## API
| Method | Route | Purpose |
|---|---|---|
| POST | /api/scans `{path}` | start scan |
| GET | /api/scans, /api/scans/:id | list / progress |
| DELETE | /api/scans/:id | delete the stored index only (never touches the drive) |
| GET | /api/scans/:id/children?path=&sort=&dir= | folder contents |
| GET | /api/scans/:id/search?q=&ext=&type=&minSize=&sort=&dir=&page= | search |
| GET | /api/scans/:id/types | size per extension |
