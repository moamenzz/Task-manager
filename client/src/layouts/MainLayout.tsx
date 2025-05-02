import { Outlet } from "react-router-dom";
import TaskNavbar from "../components/TaskNavbar";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const MainLayout = () => {
  return (
    <div className="flex">
      {/* Left Sidebar - Tasknavbar */}
      <div className="w-[5.3rem] min-h-screen flex bg-[#f9f9f9]">
        <TaskNavbar />
      </div>

      {/* Top Navbar */}
      <div className="flex flex-col w-full">
        <div className="h-[4rem] bg-[#f9f9f9]">
          <Navbar />
        </div>

        {/* Main Content - Outlet & Sidebar */}
        <div className="flex h-full">
          {/* Outlet */}
          <div className="w-[88%] rounded-lg p-2 bg-gray-200">
            <Outlet />
          </div>

          {/* Sidebar */}
          <div className="flex-1 bg-[#f9f9f9]">
            <Sidebar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
