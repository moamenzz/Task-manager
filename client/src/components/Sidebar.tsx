import { logout } from "@/lib/apiRoutes";
import { useMutation } from "@tanstack/react-query";
import ProfileCard from "./ProfileCard";
import RadialChart from "./RadialChart";

const Sidebar = () => {
  const { mutate: logoutMutation } = useMutation({
    mutationFn: logout,
  });
  return (
    <div className="bg-[#f9f9f9] flex flex-col">
      <ProfileCard />
      <div className="mt-4 mx-6">
        <RadialChart />
      </div>

      <button
        className="mt-auto mb-6 mx-6 py-4 px-8 bg-[#EB4E31] text-white rounded-[50px] hover:bg-[#3aafae] transition duration-200 ease-in-out"
        onClick={() => logoutMutation}
      >
        Sign Out
      </button>
    </div>
  );
};

export default Sidebar;
