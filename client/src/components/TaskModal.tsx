import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import queryClient from "@/config/queryClient";
import { createTask, Task, updateTask } from "@/lib/apiRoutes";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-toastify";
import ErrorThrower from "./ErrorThrower";
import { Loader } from "lucide-react";

interface TaskModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  type?: "create" | "edit";
  task?: Task; // Add this if you want to pass the task data for editing
}

const TaskModal = ({ isOpen, onOpenChange, task, type }: TaskModalProps) => {
  const [formData, setFormData] = useState<Task>({
    title: type === "edit" ? (task?.title as string) : "",
    description: type === "edit" ? (task?.description as string) : "",
    dueDate: type === "edit" ? (task?.dueDate?.split("T")[0] as string) : "",
    priority: type === "edit" ? (task?.priority as string) : "low",
    status: type === "edit" ? (task?.status as string) : "active",
    completed: type === "edit" ? (task?.completed as boolean) : false,
  });

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.title || !formData.description || !formData.dueDate)
      return toast.error("All fields are required");
    if (type === "create") {
      createTaskMutation(formData);
    } else {
      editTaskMutation({ ...formData, _id: task?._id });
    }
  };

  const {
    mutate: createTaskMutation,
    isPending: isCreationPending,
    isError: createTaskIsError,
    error: createTaskError,
  } = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      onOpenChange(false);
      setFormData({
        title: type === "edit" ? (task?.title as string) : "",
        description: type === "edit" ? (task?.description as string) : "",
        dueDate:
          type === "edit" ? (task?.dueDate?.split("T")[0] as string) : "",
        priority: type === "edit" ? (task?.priority as string) : "low",
        status: type === "edit" ? (task?.status as string) : "active",
        completed: type === "edit" ? (task?.completed as boolean) : false,
      });
      toast.success("Task Created Successfully");
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ["all-tasks"] });
    },
  });

  const {
    mutate: editTaskMutation,
    isPending: isEditingPending,
    isError: editTaskIsError,
    error: editTaskError,
  } = useMutation({
    mutationFn: (data: Task) => updateTask(data, data._id as string),
    onMutate: async (newTask) => {
      // Cancel queries
      await queryClient.cancelQueries({ queryKey: ["all-tasks"] });

      // Make snapshot
      const previousTasks = queryClient.getQueryData<Task>(["all-tasks"]);

      // Make Optimistic Update
      queryClient.setQueryData<Task[]>(["all-tasks"], (old) =>
        old?.map((task) =>
          task._id === newTask._id ? { ...task, ...newTask } : task
        )
      );

      // Return snapshot incase of error
      return { previousTasks };
    },
    onError: (err, _, context) => {
      queryClient.setQueryData<Task>(["all-tasks"], context?.previousTasks);
      toast.error("Failed to edit task");
      console.log(err);
    },
    onSuccess: () => {
      onOpenChange(false);
      setFormData({
        title: type === "edit" ? (task?.title as string) : "",
        description: type === "edit" ? (task?.description as string) : "",
        dueDate:
          type === "edit" ? (task?.dueDate?.split("T")[0] as string) : "",
        priority: type === "edit" ? (task?.priority as string) : "low",
        status: type === "edit" ? (task?.status as string) : "active",
        completed: type === "edit" ? (task?.completed as boolean) : false,
      });
      toast.success("Task Edited Successfully");
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ["all-tasks"] });
    },
  });

  const isPending = isCreationPending || isEditingPending;
  const isError = createTaskIsError || editTaskIsError;
  const error = createTaskError || editTaskError;

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[520px]">
        <DialogTitle className="text-xl font-semibold">
          {type === "edit" ? "Edit Task" : "Create Task"}
        </DialogTitle>
        <form
          action=""
          className="flex flex-col gap-3"
          onSubmit={handleFormSubmit}
        >
          <div className="flex flex-col gap-1">
            <label htmlFor="title">Title</label>
            <input
              className="bg-[#F9F9F9] p-2 rounded-md border"
              type="text"
              id="title"
              placeholder="Task Title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="description">Description</label>
            <textarea
              className="bg-[#F9F9F9] p-2 rounded-md border resize-none"
              name="description"
              placeholder="Task Description"
              rows={4}
              value={formData.description}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="priority">Select Priority</label>
            <select
              className="bg-[#F9F9F9] p-2 rounded-md border cursor-pointer"
              name="priority"
              value={formData.priority}
              onChange={handleInputChange}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="dueDate">Due Date</label>
            <input
              className="bg-[#F9F9F9] p-2 rounded-md border"
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="active">Task Activity</label>
            <div className="flex items-center justify-between bg-[#F9F9F9] p-2 rounded-md border">
              <label htmlFor="active">Value</label>
              <div>
                <select
                  className="bg-[#F9F9F9] p-2 rounded-md border cursor-pointer"
                  name="status"
                  value={type === "edit" ? task?.status : formData.status}
                  onChange={handleInputChange}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <button
              type="submit"
              disabled={isPending}
              className={`text-white py-2 rounded-md w-full  transition duration-200 ease-in-out cursor-pointer ${
                type === "edit"
                  ? "bg-blue-400 hover:bg-blue-500"
                  : "bg-green-400 hover:bg-green-500"
              } ${isPending ? "opacity-50" : ""}`}
            >
              {isPending ? (
                <div className="flex items-center justify-center">
                  <Loader />
                </div>
              ) : (
                <div> {type === "edit" ? "Update Task" : "Create Task"}</div>
              )}
            </button>
            {isError && (
              <div className="flex items-center justify-center">
                <ErrorThrower
                  isError={isError}
                  error={error as { message: string }}
                />
              </div>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TaskModal;
