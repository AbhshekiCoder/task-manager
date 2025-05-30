import mongoose from 'mongoose';
import { type } from 'os';

const taskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  date: String,
  time: String,
  status: {
    type: String,
    enum: ['pending', 'in progress', 'done'],
    default: 'pending'
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  important: {
    type: String,
    enum: ['yes', 'no'],
    default: 'no'

  },
  priority:{
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'low'
  }
  
}, { timestamps: true });

export default mongoose.model('Task', taskSchema);
