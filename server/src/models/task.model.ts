import mongoose from "mongoose";
import { activityStatus, priorityTypes } from "../constants/priorityTypes";

export interface TaskDocument extends mongoose.Document {
  user: mongoose.Types.ObjectId;
  title: string;
  description: string;
  dueDate: Date;
  priority: priorityTypes;
  status: activityStatus;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const TaskSchema = new mongoose.Schema<TaskDocument>(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    title: { type: String, required: true },
    description: { type: String, required: true },
    dueDate: { type: Date, required: true },
    priority: {
      type: String,
      required: true,
      enum: priorityTypes,
      default: priorityTypes.LOW,
    },
    status: {
      type: String,
      required: true,
      enum: activityStatus,
      default: activityStatus.active,
    },
    completed: { type: Boolean, required: true },
  },
  { timestamps: true }
);

const TaskModel = mongoose.model<TaskDocument>("Task", TaskSchema);

export default TaskModel;
