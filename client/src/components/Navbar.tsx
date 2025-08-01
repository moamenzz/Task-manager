import useAuth from "@/hooks/useAuth";
import { FaGithub, FaLinkedin, FaUser } from "react-icons/fa";

const Navbar = () => {
  const { user } = useAuth();
  const activeTasks = ["", "", ""];
  return (
    <nav className="px-4 my-2 w-full flex items-center justify-between">
      <div>
        <h1 className="text-lg font-medium">
          <span role="img" aria-label="wave">
            👋
          </span>
          {user?._id
            ? `Welcome, ${user.username}!`
            : `Welcome to ${import.meta.env.VITE_APP_NAME}`}
        </h1>
        <p className="text-sm">
          {user?._id ? (
            <>
              You have{" "}
              <span className="font-bold text-[#3aafae]">
                {activeTasks.length}
              </span>
              &nbsp;active tasks
            </>
          ) : (
            "Please login or register to view your tasks"
          )}
        </p>
      </div>
      <div className="h-[50px] flex items-center gap-[10.4rem]">
        <div className="flex gap-4 items-center">
          <a
            href="https://github.com/moamenzz"
            target="_blank"
            rel="noopener noreferrer"
            className="h-[40px] w-[40px] text-purple-500 rounded-full flex items-center justify-center text-lg border-2 border-[#E6E6E6]"
          >
            {<FaGithub size={20} />}
          </a>
          <a
            href="https://www.linkedin.com/in/moamen-muhammed-18a9b7223"
            target="_blank"
            rel="noopener noreferrer"
            className="h-[40px] w-[40px] text-purple-500 rounded-full flex items-center justify-center text-lg border-2 border-[#E6E6E6]"
          >
            {<FaLinkedin size={20} />}
          </a>
          <a
            href="https://moamen-muhammed.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="h-[40px] w-[40px] text-purple-500 rounded-full flex items-center justify-center text-lg border-2 border-[#E6E6E6]"
          >
            {<FaUser size={20} />}
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
