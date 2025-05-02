import express from "express";
import {
  getAllTasks,
  getCompletedTasks,
  getOverdueTasks,
  getPendingTasks,
  getTask,
  handleCompleteTask,
  handleCreateTask,
  handleDeleteAllTasks,
  handleDeleteTask,
  handleEditTask,
} from "../controllers/task.controller";

const taskRouter = express.Router();

taskRouter.get("/all-tasks", getAllTasks);
taskRouter.get("/completed-tasks", getCompletedTasks);
taskRouter.get("/pending-tasks", getPendingTasks);
taskRouter.get("/overdue-tasks", getOverdueTasks);
taskRouter.post("/create-task", handleCreateTask);
taskRouter.put("/edit-task/:taskId", handleEditTask);
taskRouter.delete("/delete-all-tasks", handleDeleteAllTasks);

taskRouter.get("/:taskId", getTask);
taskRouter.put("/:taskId", handleCompleteTask);
taskRouter.delete("/:taskId", handleDeleteTask);

export default taskRouter;
