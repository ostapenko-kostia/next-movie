"use client";

import { Role } from "@/interfaces/interfaces";
import styles from "./styles.module.scss";
import { useAuth } from "@/store/authStore";
import { ChevronDown, User } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

function HeaderButtons() {
  const { isAuth, logout, user } = useAuth();
  const [isOpen, setIsOpen] = useState<boolean>(!isAuth && false);
  return (
    <div className="flex items-center h-full gap-5 ml-auto max-xs:text-xs relative">
      {isAuth ? (
        <button onClick={() => setIsOpen((prev) => !prev)} className={`text-secondary transition-colors duration-150 ease-in hover:text-white flex items-center ${isOpen && "text-white"}`}>
          <User />
          <ChevronDown />
        </button>
      ) : (
        <>
          <Link href="/login" className="text-white rounded-md transition-transform duration-150 ease-in hover:scale-105">
            Login
          </Link>
          <Link href="/register" className="text-white rounded-md transition-transform duration-150 ease-in hover:scale-105">
            Register
          </Link>
        </>
      )}
      <ul
        className={`${
          isOpen ? "flex" : "hidden"
        } absolute bg-bg-color-alt w-auto min-w-48 h-auto min-h-8 py-2 top-16 right-0 z-50 rounded-md border-2 border-solid border-secondary flex-col items-center justify-center gap-1 text-center`}
      >
        {isAuth && user?.role === Role.admin && (
          <li className={styles.modalLi}>
            <Link className={styles.modalItem} href="/admin">
              Admin panel
            </Link>
          </li>
        )}
        <li className={styles.modalLi}>
          <Link className={styles.modalItem} href="/cabinet">
            My personal cabinet
          </Link>
        </li>
        <li className={styles.modalLi}>
          <button className={styles.modalItem} onClick={logout}>
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
}

export default HeaderButtons;
