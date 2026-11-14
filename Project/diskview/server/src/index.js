import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import routes from './routes.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', routes);

await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/diskview');
// A restart kills any in-flight scan, so mark leftovers as failed.
await mongoose.model('Scan').updateMany({ status: 'running' }, { status: 'error', error: 'Server restarted' });
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`DiskView API on http://localhost:${port}`));
