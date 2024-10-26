"use client";

import authService from "@/services/auth/auth.service";
import { useAuth } from "@/store/authStore";
import { GoogleLogin } from "@react-oauth/google";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

function Register() {
  const { register: signup } = useAuth();
  const { register, handleSubmit } = useForm();
  return (
    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full">
      <div className="container mx-auto max-xs:px-3">
        <div className="flex flex-col items-center justify-center gap-5 mx-auto w-96 p-8 rounded-xl bg-bg-color-alt max-xs:w-full ">
          <h2 className="text-2xl font-bold">Register</h2>
          <form
            className="flex flex-col gap-5 max-[350px]:text-center"
            onSubmit={handleSubmit((data) => {
              toast.promise(signup(data.firstName, data.lastName, data.email, data.password), {
                loading: "Loading...",
                success: "Registered successfully, please log in",
                error: "Failed to register",
              });
            })}
          >
            <label className="-mb-4" htmlFor="first-name">
              First Name
            </label>
            <input required {...register("firstName")} tabIndex={1} className="min-w-72 input" type="text" name="firstName" id="first-name" placeholder="John" />
            <label className="-mb-4" htmlFor="last-name">
              Last Name
            </label>
            <input required {...register("lastName")} tabIndex={2} className="min-w-72 input" type="text" name="lastName" id="last-name" placeholder="Doe" />
            <label className="-mb-4" htmlFor="email">
              Email
            </label>
            <input required {...register("email")} tabIndex={3} className="min-w-72 input" placeholder="123@gmail.com" type="email" name="email" id="email" />
            <label className="-mb-4" htmlFor="password">
              Password
            </label>
            <input required {...register("password")} tabIndex={4} className="min-w-72 input" type="password" name="password" id="password" placeholder="********" />
            <button tabIndex={5} className="text-lg font-semibold text-white bg-primary w-fit mx-auto px-5 py-2 rounded-xl" type="submit">
              Register
            </button>
          </form>
          <div className="text-center flex flex-col justify-center gap-3 items-center">
            Login with
            <div>
              <GoogleLogin
                locale="en"
                onSuccess={(response) => {
                  const promise = toast.promise(authService.googleLogin(response.clientId || "", response.credential || ""), {
                    loading: "Loading...",
                    success: "Registered successfully!",
                    error: "Failed to register",
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

export default Register;
