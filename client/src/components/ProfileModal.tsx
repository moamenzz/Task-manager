import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { AuthResponse, editUserProfile } from "@/lib/apiRoutes";
import { MdOutlineVerified } from "react-icons/md";
import { FaGithub } from "react-icons/fa";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import queryClient from "@/config/queryClient";
import { toast } from "react-toastify";
import Loader from "./Loader";

interface ProfileModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  user: AuthResponse; // Add this if you want to pass the task data for editing
}

interface FormDataProps extends AuthResponse {
  newPassword: string;
}
const ProfileModal = ({ isOpen, onOpenChange, user }: ProfileModalProps) => {
  const [formData, setFormData] = useState<FormDataProps>({
    avatar: user.avatar || "",
    email: user.email || "",
    username: user.username || "",
    password: "",
    newPassword: "",
    verified: user.verified,
  });

  const {
    mutate: editUserProfileMutation,
    isPending,
    error,
  } = useMutation({
    mutationFn: editUserProfile,
    onError: () => {
      toast.error(error?.message || "Failed to edit user profile");
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("User profile edited successfully");
      onOpenChange(false);
    },
  });

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[520px]">
        <DialogTitle className="text-xl font-semibold">
          Edit User Profile
        </DialogTitle>
        <div className="bg-[#333]/30">
          <div className="py-5 px-6 w-full flex flex-col gap-3 bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-md border-2 border-white">
            <div className="absolute left-0 top-0 w-full h-[80px] bg-[#323232]/10 rounded-tr-md rounded-tl-md"></div>

            <div className="mt-4 relative flex justify-between">
              <div className="relative inline-block w-20 h-20">
                <img
                  src={user.avatar || "/logo.png"}
                  alt={user.username}
                  className="rounded-full w-full h-full"
                />
                <div className="absolute bottom-0 right-1 shadow-sm">
                  <span className="text-lg text-blue-400">
                    {<MdOutlineVerified size={20} />}
                  </span>{" "}
                  {user.verified && (
                    <span className="absolute z-20 left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] text-xs text-white">
                      {<MdOutlineVerified size={20} fill="blue" />}
                    </span>
                  )}
                </div>
              </div>

              <div className="self-end flex items-center gap-2">
                {user.githubId && (
                  <button className="flex items-center gap-2 border-2 border-[#323232]/10 rounded-md py-1 px-3 text-xs font-medium text-[#323232]">
                    {<FaGithub size={20} />} Github
                  </button>
                )}
                {user.verified && (
                  <button className="flex items-center gap-2 border-2 border-[#323232]/10 rounded-md py-1 px-3 text-xs font-medium text-[#323232]">
                    {<MdOutlineVerified size={20} />} Verified
                  </button>
                )}
              </div>
            </div>
            <div>
              <h1 className="text-lg font-bold">{user.username}</h1>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>

            <form
              className="mt-4 pt-2 flex flex-col gap-4 border-t-2 border-t-[#323232]/10"
              onSubmit={(e) => {
                e.preventDefault();
                editUserProfileMutation(formData);
              }}
            >
              <div className="pt-2 grid grid-cols-[150px_1fr]">
                <label htmlFor="username" className="text-sm font-medium">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="py-[0.4rem] px-3 font-medium rounded-lg border-2 border-[#323232]/10"
                />
              </div>

              <div className="pt-4 grid grid-cols-2 gap-4 border-t-2 border-t-[#323232]/10">
                <div className="flex flex-col gap-1">
                  <label htmlFor="password" className="text-sm font-medium">
                    Current Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="py-[0.4rem] px-3 font-medium rounded-lg border-2 border-[#323232]/10"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label htmlFor="newPassword" className="text-sm font-medium">
                    New Password
                  </label>
                  <input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleInputChange}
                    className="py-[0.4rem] px-3 font-medium rounded-lg border-2 border-[#323232]/10"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-4 border-t-2 border-t-[#323232]/10">
                <button
                  className="mt-3 py-2 px-4 bg-transparent text-black text-sm font-medium rounded-md border-2 border-[#323232]/10
                hover:bg-[#EB4E31] hover:border-transparent hover:text-white transition-all duration-300 cursor-pointer"
                  disabled={isPending}
                  onClick={() => onOpenChange(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className={`mt-3 py-2 px-4 bg-[#3aafae] text-white text-sm font-medium rounded-md
                hover:bg-[#2e8d8c]/90 transition-all duration-300 cursor-pointer ${
                  isPending && "opacity-50"
                }`}
                >
                  {isPending ? (
                    <div className="flex justify-center">
                      <Loader />
                    </div>
                  ) : (
                    "Save Changes"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileModal;
