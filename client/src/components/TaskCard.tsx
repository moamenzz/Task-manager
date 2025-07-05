import { FC, useState } from "react";
import { completeTask, deleteTask, Task } from "../lib/apiRoutes";
import getPriorityColor from "../utils/getPriorityColor";
import formatTime from "../utils/formatTime";
import { FaRegStar, FaEdit, FaTrash } from "react-icons/fa";
import { useMutation } from "@tanstack/react-query";
import TaskModal from "./TaskModal";
import { toast } from "react-toastify";
import queryClient from "@/config/queryClient";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface TaskItemProps {
  task: Task;
}

const TaskCard: FC<TaskItemProps> = ({ task }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { mutate: deleteTaskMutation } = useMutation({
    mutationFn: deleteTask,
    onMutate: () => {
      // Cancel Queries
      queryClient.cancelQueries({ queryKey: ["all-tasks"] });
      queryClient.cancelQueries({ queryKey: ["completed-tasks"] });
      queryClient.cancelQueries({ queryKey: ["pending-tasks"] });
      queryClient.cancelQueries({ queryKey: ["overdue-tasks"] });

      // Snapshot the previous value
      const previousTasks = queryClient.getQueryData<Task[]>(["all-tasks"]);

      // Make Optimistic Update
      queryClient.setQueryData<Task[]>(["all-tasks"], (old) => {
        return old?.filter((t) => t._id !== task._id);
      });

      // Return snapshot in case of error
      return { previousTasks };
    },
    onError: (err, _, context) => {
      queryClient.setQueryData<Task[]>(["all-tasks"], context?.previousTasks);
      console.log(err);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["all-tasks"] });
    },
  });

  const { mutate: completeTaskMutation } = useMutation({
    mutationFn: completeTask,
    onMutate: async (taskId) => {
      // Cancel Queries
      await queryClient.cancelQueries({ queryKey: ["all-tasks"] });
      await queryClient.cancelQueries({ queryKey: ["completed-tasks"] });
      await queryClient.cancelQueries({ queryKey: ["pending-tasks"] });
      await queryClient.cancelQueries({ queryKey: ["overdue-tasks"] });

      // Snapshot the previous value
      const previousTasks = queryClient.getQueryData<Task[]>(["all-tasks"]);

      // Make Optimistic Update
      queryClient.setQueryData<Task[]>(["all-tasks"], (old) => {
        return old?.map((t) =>
          t._id === taskId ? { ...t, completed: !t.completed } : t
        );
      });

      // Return snapshot in case of error
      return { previousTasks };
    },
    onError: (err, _, context) => {
      queryClient.setQueryData<Task[]>(["all-tasks"], context?.previousTasks);
      toast.error("Failed to complete task");
      console.log(err);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["all-tasks"] });
      queryClient.invalidateQueries({ queryKey: ["completed-tasks"] });
      queryClient.invalidateQueries({ queryKey: ["pending-tasks"] });
      queryClient.invalidateQueries({ queryKey: ["overdue-tasks"] });
    },
  });

  return (
    <div className="h-[15rem] w-[21rem] px-4 py-3 flex flex-col gap-4 shadow-sm bg-[#f9f9f9] rounded-lg border-2 border-white">
      <div>
        <h4 className="font-bold text-2xl">{task.title}</h4>
        <p>{task.description}</p>
      </div>
      <div className="mt-auto flex justify-between items-center">
        <p className="text-sm text-gray-400">
          {formatTime(task.createdAt as Date)}
        </p>
        <p className={`text-sm font-bold ${getPriorityColor(task.priority)}`}>
          {task.priority}
        </p>
        <div>
          <div className="flex items-center gap-3 text-gray-400 text-[1.2rem]">
            {/* Complete Task Button */}

            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  className={`${
                    task.completed ? "text-yellow-400" : "text-gray-400"
                  } cursor-pointer`}
                  onClick={() => completeTaskMutation(task._id as string)}
                >
                  {<FaRegStar size={15} />}
                </button>
              </TooltipTrigger>
              <TooltipContent>
                {task.completed ? "Uncomplete Task" : "Complete Task"}
              </TooltipContent>
            </Tooltip>

            {/* Edit Task Button */}
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  className="text-[#00A1F1] cursor-pointer"
                  onClick={() => setIsModalOpen(true)}
                >
                  {<FaEdit size={15} />}
                </button>
              </TooltipTrigger>
              <TooltipContent>Edit Task</TooltipContent>
            </Tooltip>

            {/* Delete Task Button */}
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  className="text-[#F65314] cursor-pointer"
                  onClick={() => {
                    deleteTaskMutation(task._id as string);
                  }}
                >
                  {<FaTrash size={15} />}
                </button>
              </TooltipTrigger>
              <TooltipContent>Delete Task</TooltipContent>
            </Tooltip>
          </div>
        </div>
      </div>

      <TaskModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        task={task}
        type="edit"
      />
    </div>
  );
};

export default TaskCard;
