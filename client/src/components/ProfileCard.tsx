import useAuth from "@/hooks/useAuth";
import { useState } from "react";
import ProfileModal from "./ProfileModal";
import { AuthResponse, Task } from "@/lib/apiRoutes";
import queryClient from "@/config/queryClient";

const ProfileCard = () => {
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const tasks = queryClient.getQueryData<Task[]>(["all-tasks"]) || [];
  const completedTasks =
    queryClient.getQueryData<Task[]>(["completed-tasks"]) || [];
  const pendingTasks =
    queryClient.getQueryData<Task[]>(["pending-tasks"]) || [];
  const overdueTasks =
    queryClient.getQueryData<Task[]>(["overdue-tasks"]) || [];

  return (
    <div className="m-6">
      <div
        className="flex items-center px-2 py-4 bg-[#E6E6E6]/20 rounded-md
            hover:bg-[#E6E6E6]/50 transition duration-300 ease-in-out cursor-pointer border-2 border-transparent hover:border-2 hover:border-white"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="flex w-15 h-15">
          <img src={user?.avatar || "/logo.png"} alt={user?.username} />
        </div>
        <div>
          <h1 className="flex flex-col text-xl">
            <span className=" font-medium">Hello,</span>
            <span className="font-bold">{user?.username}</span>
          </h1>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-8">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-gray-400">
            <p>Total Tasks:</p>
            <p className="pl-4 relative flex gap-2">
              <span className="absolute h-[70%] w-[0.2rem] left-[1px] top-1/2 translate-y-[-50%] bg-purple-500 rounded-[5px]"></span>
              <span className="font-medium text-4xl text-[#333]">
                {tasks.length}
              </span>
            </p>
          </div>
          <div className="text-gray-400">
            <p>In Progress:</p>
            <p className="pl-4 relative flex gap-2">
              <span className="absolute h-[70%] w-[0.2rem] left-[1px] top-1/2 translate-y-[-50%] bg-[#3AAFAE] rounded-[5px]"></span>
              <span className="font-medium text-4xl text-[#333]">
                {pendingTasks.length}
              </span>
            </p>
          </div>
          <div className="text-gray-400">
            <p>Overdue Tasks:</p>
            <p className="pl-4 relative flex gap-2">
              <span className="absolute h-[70%] w-[0.2rem] left-[1px] top-1/2 translate-y-[-50%] bg-orange-400 rounded-[5px]"></span>
              <span className="font-medium text-4xl text-[#333]">
                {overdueTasks.length}
              </span>
            </p>
          </div>
          <div className="text-gray-400">
            <p>Completed:</p>
            <p className="pl-4 relative flex gap-2">
              <span className="absolute h-[70%] w-[0.2rem] left-[1px] top-1/2 translate-y-[-50%] bg-green-400 rounded-[5px]"></span>
              <span className="font-medium text-4xl text-[#333]">
                {completedTasks.length}
              </span>
            </p>
          </div>
        </div>
      </div>
      <h3 className="mt-8 font-medium">Activity</h3>

      <ProfileModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        user={user as AuthResponse}
      />
    </div>
  );
};

export default ProfileCard;
