"use client";

import { useAuth } from "@/store/authStore";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { GoogleLogin } from "@react-oauth/google";
import authService from "@/services/auth/auth.service";

function Login() {
  const { register, handleSubmit } = useForm();
  const { login } = useAuth();
  const router = useRouter();
  return (
    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full">
      <div className="container mx-auto max-xs:px-3">
        <div className="flex flex-col items-center justify-center gap-5 mx-auto w-96 p-8 rounded-xl bg-bg-color-alt max-xs:w-full ">
          <h2 className="text-2xl font-bold">Login</h2>
          <form
            className="flex flex-col gap-5 max-[350px]:text-center"
            onSubmit={handleSubmit((data) => {
              const promise = toast.promise(login(data.email, data.password), {
                loading: "Logging in...",
                success: "Logged in successfully!",
                error: "Something went wrong :( Please try again later or contact support.",
              });
              promise.then(() => router.push("/"));
            })}
          >
            <label className="-mb-4" htmlFor="email">
              Email
            </label>
            <input required tabIndex={1} {...register("email")} className="min-w-72 input" placeholder="123@gmail.com" type="email" name="email" id="email" />
            <label className="-mb-4" htmlFor="password">
              Password
            </label>
            <input required tabIndex={2} {...register("password")} className="min-w-72 input" type="password" name="password" id="password" placeholder="********" />
            <button tabIndex={3} className="text-lg font-semibold text-white bg-primary w-fit mx-auto px-5 py-2 rounded-xl" type="submit">
              Login
            </button>
          </form>
          <div className="text-center flex flex-col justify-center gap-3 items-center">
            Login with
            <div>
              <GoogleLogin
                locale="en"
                onSuccess={(response) => {
                  const promise = toast.promise(authService.googleLogin(response.clientId || "", response.credential || ""), {
                    loading: "Logging in...",
                    success: "Logged in successfully!",
                    error: "Something went wrong :( Please try again later or contact support.",
                  });
                  promise.then(() => window.location.reload());
                }}
                onError={() => console.log("Failed")}
              />
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

export default Login;
