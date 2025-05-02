import { NOT_FOUND } from "../constants/HttpStatusCode";
import TaskModel from "../models/task.model";
import UserModel from "../models/user.model";
import { taskSchema } from "../schemas/task.schema";
import { createTask, editTask } from "../services/task.service";
import appAssert from "../utils/AppAssert";
import catchErrors from "../utils/catchError";

export const getAllTasks = catchErrors(async (req, res) => {
  const userId = req.userId;

  const user = await UserModel.findById(userId);
  appAssert(user, NOT_FOUND, "User not found");

  const tasks = await TaskModel.find({ user: userId }).populate("user");

  res.status(200).json(tasks);
});

export const getTask = catchErrors(async (req, res) => {
  const userId = req.userId;
  const taskId = req.params.taskId;

  const user = await UserModel.findById(userId);
  appAssert(user, NOT_FOUND, "User not found");

  const task = await TaskModel.findById(taskId).populate("user");
  appAssert(task, NOT_FOUND, "Task not found");

  res.status(200).json(task);
});

export const getCompletedTasks = catchErrors(async (req, res) => {
  const userId = req.userId;

  const user = await UserModel.findById(userId);
  appAssert(user, NOT_FOUND, "User not found");

  const tasks = await TaskModel.find({
    user: userId,
    completed: true,
  }).populate("user");

  res.status(200).json(tasks);
});

export const getPendingTasks = catchErrors(async (req, res) => {
  const userId = req.userId;

  const user = await UserModel.findById(userId);
  appAssert(user, NOT_FOUND, "User not found");

  const tasks = await TaskModel.find({
    user: userId,
    completed: false,
    dueDate: { $gte: new Date() },
  }).populate("user");

  res.status(200).json(tasks);
});

export const getOverdueTasks = catchErrors(async (req, res) => {
  const userId = req.userId;

  const user = await UserModel.findById(userId);
  appAssert(user, NOT_FOUND, "User not found");

  const tasks = await TaskModel.find({
    user: userId,
    completed: false,
    dueDate: { $lt: new Date() },
  }).populate("user");

  res.status(200).json(tasks);
});

export const handleCreateTask = catchErrors(async (req, res) => {
  const userId = req.userId;
  const data = taskSchema.parse(req.body);

  const { createdTask } = await createTask(userId, data);

  res.status(200).json(createdTask);
});

export const handleEditTask = catchErrors(async (req, res) => {
  const userId = req.userId;
  const taskId = req.params.taskId;
  const data = taskSchema.parse(req.body);

  const { task } = await editTask(userId, taskId, data);

  res.status(200).json(task);
});

export const handleCompleteTask = catchErrors(async (req, res) => {
  const userId = req.userId;
  const taskId = req.params.taskId;

  const user = await UserModel.findById(userId);
  appAssert(user, NOT_FOUND, "User not found");

  const task = await TaskModel.findOne({ _id: taskId, user: userId }).populate(
    "user"
  );
  appAssert(task, NOT_FOUND, "Task not found/Unauthorized to complete ");

  const isTaskCompleted = task.completed;

  if (isTaskCompleted) {
    task.completed = false;
    await task.save();
    res.status(200).json({ message: "Task uncompleted successfully" });
  } else {
    task.completed = true;
    await task.save();
    res.status(200).json({ message: "Task completed successfully" });
  }
});

export const handleDeleteTask = catchErrors(async (req, res) => {
  const userId = req.userId;
  const taskId = req.params.taskId;

  const user = await UserModel.findById(userId);
  appAssert(user, NOT_FOUND, "User not found");

  const task = await TaskModel.find({ _id: taskId, user: userId }).populate(
    "user"
  );
  appAssert(task, NOT_FOUND, "Task not found/Unauthorized to delete ");

  await TaskModel.findByIdAndDelete(taskId);

  res.status(200).json({ message: "Task deleted successfully" });
});

export const handleDeleteAllTasks = catchErrors(async (req, res) => {
  const userId = req.userId;

  const user = await UserModel.findById(userId);
  appAssert(user, NOT_FOUND, "User not found");

  const deletedTasks = await TaskModel.deleteMany({ user: userId });

  return { message: "All tasks deleted successfully" };
});
