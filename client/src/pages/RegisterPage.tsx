import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { register, RegisterData } from "../lib/apiRoutes";
import { toast } from "react-toastify";
import { useState } from "react";
import Input from "../components/Input";
import { IoEye, IoEyeOff } from "react-icons/io5";
import Loader from "@/components/Loader";
import ErrorThrower from "@/components/ErrorThrower";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<RegisterData>({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setFormData({ ...formData, [name]: value });
  };

  const {
    mutate: registerMutation,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: register,
    onError: () => {
      const errorMsg = error?.message || "Unknown Error";
      toast.error(`Login Failed: ${errorMsg}`);
    },
    onSuccess: () => {
      navigate("/");
      toast.success("Registration Successful");
    },
  });

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    registerMutation(formData);
  };

  return (
    <div className="flex justify-center items-center min-h-full">
      <form
        onSubmit={handleSubmitForm}
        className="relative m-[2rem] px-10 py-14 rounded-lg bg-white w-full max-w-[520px]"
      >
        <div className="relative z-10">
          <h1 className="mb-2 text-center text-[1.35rem] font-medium">
            Register for an Account
          </h1>
          <p className="mb-8 px-[2rem] text-center text-[#999] text-[14px]">
            Create an account. Already have an account?{" "}
            <a
              href="/login"
              className="font-bold text-[#2ECC71] hover:text-[#7263F3] transition-all duration-300"
            >
              Login
            </a>
          </p>
          <div className="flex flex-col">
            <label htmlFor="username" className="mb-1 text-[#999]">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={formData.username}
              onChange={handleInputChange}
              name="username"
              className="px-4 py-3 border-[2px] rounded-md outline-[#2ECC71] text-gray-800"
              placeholder="John Doe"
            />
          </div>

          <div className="mt-[1rem] flex flex-col">
            <label htmlFor="email" className="mb-1 text-[#999]">
              Email
            </label>
            <input
              type="text"
              id="email"
              value={formData.email}
              onChange={handleInputChange}
              name="email"
              className="px-4 py-3 border-[2px] rounded-md outline-[#2ECC71] text-gray-800"
              placeholder="johndoe@gmail.com"
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
              className="absolute right-4 top-[53%] cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <IoEye size={20} /> : <IoEyeOff size={20} />}
            </div>
          </div>

          <div className="relative">
            <label htmlFor="confirmPassword" className="text-[#999]">
              Confirm Password
            </label>
            <Input
              id="password"
              type={"password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="px-4 py-3 border-[2px] rounded-md outline-[#2ECC71] text-gray-800"
              placeholder="Conirm your password"
              required
            />
          </div>

          <div className="flex flex-col cursor-pointer">
            <button
              type="submit"
              disabled={
                isPending ||
                !formData.email ||
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
                "Register"
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

export default RegisterPage;
