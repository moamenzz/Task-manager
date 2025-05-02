import { z } from "zod";
import { activityStatus, priorityTypes } from "../constants/priorityTypes";

export const taskSchema = z.object({
  title: z.string({ required_error: "Title is required" }).min(1).max(30),
  description: z
    .string({ required_error: "Description is required" })
    .min(1)
    .max(255),
  priority: z.enum(
    [priorityTypes.HIGH, priorityTypes.MEDIUM, priorityTypes.LOW],
    { required_error: "Priority is required" }
  ),
  status: z.enum([activityStatus.active, activityStatus.inactive], {
    required_error: "Status is required",
  }),
  completed: z.boolean(),
  dueDate: z
    .string({ required_error: "Due date is required" })
    .transform((str) => new Date(str)),
});
