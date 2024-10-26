"use client";

import userService from "@/services/user/user.service";
import { useAuth } from "@/store/authStore";
import { Check, Edit2 } from "lucide-react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

function AccountInfo() {
  const { user } = useAuth();
  const { register, handleSubmit } = useForm();
  const [isInput, setIsInput] = useState<boolean>(false);
  return (
    <div className="my-4 w-full flex flex-col mt-8">
      <h3 className="text-2xl">Account info</h3>
      <ul className="mt-4 flex flex-col w-full gap-2">
        <li className="text-lg flex items-center justify-between max-sm:text-sm max-sm:justify-normal max-sm:gap-3 max-xs:text-xs max-sm:flex-col">
          <span>Email:</span>
          <div className="w-3/5 flex items-center justify-between max-sm:gap-3 max-sm:w-full">
            <form
              onSubmit={handleSubmit((data) => {
                const promise = toast.promise(userService.editEmail(data.newEmail), {
                  loading: "Loading...",
                  success: "Email changed successfully!",
                  error: "Failed to change email",
                });
                promise.then(() => window.location.reload());
              })}
              className="flex items-center gap-3"
            >
              <input
                {...register("newEmail")}
                type="email"
                disabled={!isInput}
                className={`${isInput ? "input" : ""} text-white placeholder:text-secondary disabled:bg-transparent text-left min-w-72 max-sm:min-w-min`}
                placeholder={user!.email}
              />
              <button type="submit" className={isInput ? "bg-primary text-nowrap p-2 rounded-full" : "hidden"}>
                <Check />
              </button>
            </form>
            <button onClick={() => setIsInput((prev) => !prev)} className="text-secondary transition-colors duration-200 hover:text-primary">
              <Edit2 />
            </button>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default AccountInfo;
