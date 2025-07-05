import { Link, useNavigate } from "react-router-dom";
import { login, LoginData } from "../lib/apiRoutes";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useState } from "react";
import ErrorThrower from "../components/ErrorThrower";
import Loader from "@/components/Loader";
import { IoEyeOff } from "react-icons/io5";
import { IoEye } from "react-icons/io5";
import Input from "@/components/Input";

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<LoginData>({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setFormData({ ...formData, [name]: value });
  };

  const {
    mutate: loginMutation,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      toast.success("Login Sucessful");
      navigate("/");
    },
  });

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginMutation(formData);
  };

  return (
    <div className="flex justify-center items-center min-h-full">
      <form
        onSubmit={handleSubmitForm}
        className="px-10 py-14 rounded-lg bg-white w-full max-w-[520px]"
      >
        <div className="relative z-10 space-y-2">
          <h1 className="mb-2 text-center text-[1.35rem] font-medium">
            Login to Your Account
          </h1>
          <p className="mb-8 px-[2rem] text-center text-[#999] text-[14px]">
            Login Now. Don't have an account?{" "}
            <Link
              to="/register"
              className="font-bold text-[#2ECC71] hover:text-[#7263F3] transition-all duration-300"
            >
              Register
            </Link>
          </p>

          <div>
            <label htmlFor="email" className="mb-1 text-[#999]">
              Email
            </label>
            <Input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="px-4 py-3 border-[2px] rounded-md outline-[#2ECC71] text-gray-800"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="relative">
            <label htmlFor="password" className="mb-1 text-[#999]">
              Password
            </label>
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="px-4 py-3 border-[2px] rounded-md outline-[#2ECC71] text-gray-800"
              placeholder="Password"
              required
            />

            <div
              className="absolute right-4 top-[55%] cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <IoEye size={20} /> : <IoEyeOff size={20} />}
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <Link
              to="/forgot-password"
              className="font-bold text-[#2ECC71] text-[14px] hover:text-[#7263F3] transition-all duration-300"
            >
              Forgot password?
            </Link>
          </div>
          <div className="flex flex-col">
            <button
              type="submit"
              disabled={isPending || !formData.email || !formData.password}
              className="mt-[1.5rem] flex-1 px-4 py-3 font-bold bg-[#2ECC71] text-white rounded-md hover:bg-[#1abc9c] transition-colors cursor-pointer"
            >
              {isPending ? (
                <div className="flex justify-center items-center">
                  <Loader />
                </div>
              ) : (
                "Login"
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

export default LoginPage;
