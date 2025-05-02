import mongoose from "mongoose";
import { activityStatus, priorityTypes } from "../constants/priorityTypes";
import UserModel from "../models/user.model";
import { NOT_FOUND } from "../constants/HttpStatusCode";
import appAssert from "../utils/AppAssert";
import TaskModel from "../models/task.model";

interface CreateTaskParams {
  title: string;
  description: string;
  dueDate: Date;
  priority: priorityTypes;
  status: activityStatus;
  completed: boolean;
}

export const createTask = async (
  userId: mongoose.Types.ObjectId,
  data: CreateTaskParams
) => {
  const user = await UserModel.findById(userId);
  appAssert(user, NOT_FOUND, "User not found");

  const createdTask = await TaskModel.create({
    user: userId,
    title: data.title,
    description: data.description,
    dueDate: data.dueDate,
    priority: data.priority,
    status: data.status,
    completed: data.completed,
  });

  return { createdTask };
};

export const editTask = async (
  userId: mongoose.Types.ObjectId,
  taskId: string,
  data: CreateTaskParams
) => {
  const user = await UserModel.findById(userId);
  appAssert(user, NOT_FOUND, "User not found");

  const task = await TaskModel.findOne({ _id: taskId, user: userId });
  appAssert(task, NOT_FOUND, "Task not found");

  task.title = data.title;
  task.description = data.description;
  task.dueDate = data.dueDate;
  task.priority = data.priority;
  task.status = data.status;
  task.completed = data.completed;

  await task.save();
  return { task };
};
