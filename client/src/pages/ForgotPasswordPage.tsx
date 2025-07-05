import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "../lib/apiRoutes";
import { useState } from "react";
import Loader from "@/components/Loader";
import ErrorThrower from "@/components/ErrorThrower";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const {
    mutate: forgotPasswordMutation,
    isPending,
    isError,
    error,
    isSuccess,
  } = useMutation({
    mutationFn: forgotPassword,
  });

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    forgotPasswordMutation(email);
  };

  return isSuccess ? (
    <div className="flex justify-center items-center min-h-full">
      <form
        onSubmit={handleSubmitForm}
        className="relative m-[2rem] px-10 py-14 rounded-lg bg-white max-w-[520px] w-full"
      >
        <div className="relative z-10">
          <h1 className="mb-2 text-center text-[1.35rem] font-medium">
            If we find an eligible account associated with that address, we will
            send an email to the address containing further instructions to
            recover your password.
          </h1>{" "}
        </div>
        <img src="/flurry.png" alt="" />
      </form>
    </div>
  ) : (
    <div className="flex justify-center items-center min-h-full">
      <form
        onSubmit={handleSubmitForm}
        className="relative m-[2rem] px-10 py-14 rounded-lg bg-white max-w-[520px] w-full"
      >
        <div className="relative z-10">
          <h1 className="mb-2 text-center text-[1.35rem] font-medium">
            Enter your email to reset your password
          </h1>
          <div className="mt-[1rem] flex flex-col">
            <label htmlFor="email" className="mb-1 text-[#999]">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              placeholder="johndoe@gmail.com"
              className="px-4 py-3 border-[2px] rounded-md outline-[#2ECC71] text-gray-800"
            />
          </div>

          <div className="flex flex-col cursor-pointer">
            <button
              type="submit"
              disabled={isPending || !email}
              className="mt-[1.5rem] flex-1 px-4 py-3 font-bold bg-[#2ECC71] text-white rounded-md hover:bg-[#1abc9c] transition-colors cursor-pointer"
            >
              {isPending ? (
                <div className="flex justify-center items-center">
                  <Loader />
                </div>
              ) : (
                "Submit"
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

export default ForgotPasswordPage;
