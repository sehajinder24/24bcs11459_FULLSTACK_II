import mongoose from 'mongoose';
const { Schema } = mongoose;

export const Scan = mongoose.model('Scan', new Schema({
  rootPath: String,
  status: { type: String, default: 'running' }, // running | done | error
  error: String,
  files: { type: Number, default: 0 },
  folders: { type: Number, default: 0 },
  skipped: { type: Number, default: 0 },
  totalSize: { type: Number, default: 0 },
  startedAt: { type: Date, default: Date.now },
  finishedAt: Date,
}));

const nodeSchema = new Schema({
  scanId: { type: Schema.Types.ObjectId, index: true },
  path: String,
  parentPath: String,          // null for the scan root
  name: String,
  isDir: Boolean,
  size: Number,                // for folders: total of everything inside
  files: Number,               // for folders: recursive file count
  folders: Number,             // for folders: recursive subfolder count
  ext: String,                 // lowercase, no dot; '' if none
  mtime: Date,
}, { versionKey: false });
nodeSchema.index({ scanId: 1, parentPath: 1, size: -1 });
nodeSchema.index({ scanId: 1, isDir: 1, ext: 1 });
nodeSchema.index({ scanId: 1, size: -1 });
export const Node = mongoose.model('Node', nodeSchema);
