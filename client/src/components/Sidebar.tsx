import { logout } from "@/lib/apiRoutes";
import { useMutation } from "@tanstack/react-query";
import ProfileCard from "./ProfileCard";
import RadialChart from "./RadialChart";
import { toast } from "react-toastify";

const Sidebar = () => {
  const { mutate: logoutMutation } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      toast.success("Logged out successfully");
      window.location.href = "/login";
    },
    onError: () => {
      toast.error("Failed to log out");
    },
  });
  return (
    <div className="bg-[#f9f9f9] flex flex-col">
      <ProfileCard />
      <div className="mt-4 mx-6">
        <RadialChart />
      </div>

      <button
        className="mt-4 mb-6 mx-6 py-2 px-4 bg-[#EB4E31] text-white rounded-[50px] hover:bg-[#3aafae] cursor-pointer transition duration-200 ease-in-out"
        onClick={() => logoutMutation()}
      >
        Log Out
      </button>
    </div>
  );
};

export default Sidebar;
