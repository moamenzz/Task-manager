import { useQuery } from "@tanstack/react-query";
import {
  getAllTasks,
  getCompletedTasks,
  getOverdueTasks,
  getPendingTasks,
} from "../lib/apiRoutes";
import Loader from "../components/Loader";
import ErrorThrower from "../components/ErrorThrower";
import useUIStore from "../stores/useUIStore";
import TaskCard from "@/components/TaskCard";
import TaskModal from "@/components/TaskModal";
import { useState } from "react";

const TasksPage = () => {
  const { activePage } = useUIStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    data: allTasks,
    isLoading: isLoadingAll,
    isError: isErrorAll,
    error: errorAll,
  } = useQuery({
    queryKey: ["all-tasks"],
    queryFn: getAllTasks,
    enabled: activePage === "All Tasks",
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 30, // 30 minutes
  });

  const {
    data: completedTasks,
    isLoading: isLoadingCompleted,
    isError: isErrorCompleted,
    error: errorCompleted,
  } = useQuery({
    queryKey: ["completed-tasks"],
    queryFn: getCompletedTasks,
    enabled: activePage === "Completed Tasks",
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 30, // 30 minutes
  });

  const {
    data: pendingTasks,
    isLoading: isLoadingPending,
    isError: isErrorPending,
    error: errorPending,
  } = useQuery({
    queryKey: ["pending-tasks"],
    queryFn: getPendingTasks,
    enabled: activePage === "Pending Tasks",
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 30, // 30 minutes
  });

  const {
    data: overdueTasks,
    isLoading: isLoadingOverdue,
    isError: isErrorOverdue,
    error: errorOverdue,
  } = useQuery({
    queryKey: ["overdue-tasks"],
    queryFn: getOverdueTasks,
    enabled: activePage === "Overdue Tasks",
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 30, // 30 minutes
  });

  const isLoading =
    isLoadingAll || isLoadingCompleted || isLoadingPending || isLoadingOverdue;
  const isError =
    isErrorAll || isErrorCompleted || isErrorPending || isErrorOverdue;
  const error = errorAll || errorCompleted || errorPending || errorOverdue;
  const tasks = (() => {
    switch (activePage) {
      case "All Tasks":
        return allTasks;
      case "Completed Tasks":
        return completedTasks;
      case "Pending Tasks":
        return pendingTasks;
      case "Overdue Tasks":
        return overdueTasks;
      default:
        return [];
    }
  })();

  return isLoading ? (
    <div className="flex justify-center items-center">
      <Loader />
    </div>
  ) : isError ? (
    <ErrorThrower isError={isError} error={error as { message: string }} />
  ) : (
    <div className="min-h-full">
      <div className="mx-auto">
        <div className="flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <h1 className="font-bold text-xl px-2 py-1">{activePage}</h1>
          </div>

          <div className="flex flex-col md:grid md:grid-cols-4 gap-4">
            {tasks?.map((task) => (
              <TaskCard key={task._id} task={task} />
            ))}
            {activePage === "All Tasks" && (
              <button
                className="h-[15rem] py-2 cursor-pointer rounded-md text-lg font-medium text-gray-500 border-dashed border-2 border-gray-400
          hover:bg-gray-300 hover:border-none transition duration-200 ease-in-out"
                onClick={() => setIsModalOpen(true)}
              >
                Add New Task
              </button>
            )}
          </div>
        </div>
      </div>

      <TaskModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        type="create"
      />
    </div>
  );
};

export default TasksPage;
