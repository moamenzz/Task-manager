import { CiGrid41 } from "react-icons/ci";
import { MdOutlineTimerOff } from "react-icons/md";
import { RiFileCheckLine } from "react-icons/ri";
import { GoStopwatch } from "react-icons/go";
import { MdDelete } from "react-icons/md";
import useUIStore from "../stores/useUIStore";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { useMutation } from "@tanstack/react-query";
import { deleteAllTasks } from "@/lib/apiRoutes";
import queryClient from "@/config/queryClient";
import { toast } from "react-toastify";
import { JSX } from "react";
import useAuth from "@/hooks/useAuth";

const TaskNavbar = () => {
  const { activePage, setActivePage } = useUIStore();
  const { user } = useAuth();

  const { mutate: deleteAllTasksMutation } = useMutation({
    mutationFn: deleteAllTasks,
    onSuccess: () => {
      setActivePage("All Tasks");
      queryClient.invalidateQueries({ queryKey: ["all-tasks"] });
    },
    onError: () => {
      toast.error("Failed to delete all tasks");
    },
  });

  const navItems: Array<{
    icon: JSX.Element;
    title: string;
    page: "All Tasks" | "Completed Tasks" | "Pending Tasks" | "Overdue Tasks";
    link: string;
  }> = [
    {
      icon: <CiGrid41 size={25} />,
      title: "All",
      page: "All Tasks",
      link: "/",
    },
    {
      icon: <RiFileCheckLine size={25} />,
      title: "Completed",
      page: "Completed Tasks",
      link: "/completed",
    },
    {
      icon: <GoStopwatch size={25} />,
      title: "Pending",
      page: "Pending Tasks",
      link: "/pending",
    },
    {
      icon: <MdOutlineTimerOff size={25} />,
      title: "Overdue",
      page: "Overdue Tasks",
      link: "/overdue",
    },
  ];

  return (
    <div className="basis-[5rem] flex flex-col bg-[#f9f9f9] mt-3">
      <div className="flex items-center justify-center">
        <img src="/logo.png" alt={"logo"} className="w-10 h-12" />
      </div>

      {user !== null && (
        <div className="mt-8 flex-1 flex flex-col items-center justify-between">
          <ul className="flex flex-col gap-10">
            {navItems.map((item, index) => (
              <li key={index} className={`relative group`}>
                <span
                  className={`hover:text-blue-500 cursor-pointer  ${
                    activePage === `${item.page}` ? "text-blue-500" : ""
                  }`}
                  onClick={() => setActivePage(item.page)}
                >
                  {item.icon}
                </span>

                {/* Hover Tooltip */}
                <span className="absolute top-[50%] translate-y-[-50%] left-8 text-xs pointer-events-none text-white bg-[#3aafae] px-2 py-1 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {item.title}
                </span>
              </li>
            ))}
          </ul>

          <div className="mb-[1.5rem]">
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  className="w-12 h-12 flex justify-center items-center border-2 border-[#EB4E31] text-[#EB4E31] p-2 rounded-full cursor-pointer hover:text-red-800 duration-200 transition-colors"
                  onClick={() => deleteAllTasksMutation()}
                >
                  <MdDelete size={25} />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Delete All Tasks</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskNavbar;
