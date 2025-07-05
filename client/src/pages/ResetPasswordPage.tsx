import { useMutation } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import { resetPassword } from "../lib/apiRoutes";
import { useState } from "react";
import Loader from "@/components/Loader";
import ErrorThrower from "@/components/ErrorThrower";
import Input from "@/components/Input";
import { IoEye, IoEyeOff } from "react-icons/io5";

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
    code: code ? code : "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setFormData({ ...formData, [name]: value });
  };

  const {
    mutate: resetPasswordMutation,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      navigate("/login");
    },
  });

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    resetPasswordMutation(formData);
  };
  return (
    <div className="flex justify-center items-center min-h-full">
      <form
        onSubmit={handleSubmitForm}
        className="ml-0 mt-0 m-[2rem] px-10 py-14 rounded-lg bg-white max-w-[520px] w-full"
      >
        <div className="relative z-10">
          <h1 className="mb-2 text-center text-[1.35rem] font-medium">
            Reset Your Password
          </h1>

          <div className="relative">
            <label htmlFor="password" className="mb-1 text-[#999]">
              New Password
            </label>
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="px-4 py-3 border-[2px] rounded-md outline-[#2ECC71] text-gray-800"
              placeholder="New Password"
              required
            />

            <div
              className="absolute right-4 top-[53%] cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <IoEye size={20} /> : <IoEyeOff size={20} />}
            </div>
          </div>

          <div className="relative">
            <label htmlFor="confirmPassword" className="mb-1 text-[#999]">
              Confirm Password
            </label>
            <Input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="px-4 py-3 border-[2px] rounded-md outline-[#2ECC71] text-gray-800"
              placeholder="Confirm password"
              required
            />
          </div>

          <div className="flex flex-col cursor-pointer">
            <button
              type="submit"
              disabled={
                isPending ||
                !formData.password ||
                !formData.confirmPassword ||
                formData.password !== formData.confirmPassword
              }
              className="mt-[1.5rem] flex-1 px-4 py-3 font-bold bg-[#2ECC71] text-white rounded-md hover:bg-[#1abc9c] transition-colors cursor-pointer"
            >
              {isPending ? (
                <div className="flex justify-center items-center">
                  <Loader />
                </div>
              ) : (
                "Reset Password"
              )}
            </button>
            {isError && (
              <ErrorThrower isError={isError} error={error as Error} />
            )}
          </div>
        </div>
        <img src="/flurry.png" alt="" />
      </form>
    </div>
  );
};

export default ResetPasswordPage;
