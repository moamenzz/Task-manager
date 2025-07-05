import { Task } from "@/lib/apiRoutes";

interface TaskCompletionProps {
  allTasks: Task[];
  completedTasks: Task[];
  pendingTasks: Task[];
}

const calculateTaskCompletion = ({
  allTasks,
  completedTasks,
  pendingTasks,
}: TaskCompletionProps) => {
  const totalTasks = allTasks.length;
  const completedTaskCount = completedTasks.length;
  const pendingTaskCount = pendingTasks.length;
  const totalCompletedTasks = completedTaskCount + pendingTaskCount;
  const completionPercentage = (totalCompletedTasks / totalTasks) * 100;
  return completionPercentage;
};

export default calculateTaskCompletion;
