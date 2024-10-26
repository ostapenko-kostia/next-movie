"use client";

import { useAuth } from "@/store/authStore";
import { useEffect } from "react";

function CheckAuthUtil() {
  const { checkAuth } = useAuth();
  useEffect(() => {
    checkAuth();
  }, []);
  return <></>;
}

export default CheckAuthUtil;
