"use client";

import { GoogleOAuthProvider } from "@react-oauth/google";
import { ReactNode } from "react";

interface Props {
  readonly children: ReactNode;
}

export const GoogleAuthProvider = ({ children }: Props) => {
  return <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_CLIENT_ID || ""}>{children}</GoogleOAuthProvider>;
};