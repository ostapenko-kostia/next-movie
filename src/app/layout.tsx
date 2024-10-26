import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Toaster } from "react-hot-toast";
import CheckAuthUtil from "@/components/util/CheckAuthUtil";
import { GoogleAuthProvider } from "./GoogleAuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  colorScheme: "dark",
};

export const metadata: Metadata = {
  title: "Next Movie",
  description: "Online movie booking platform",
  icons: "/logo.svg",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GoogleAuthProvider>
          <CheckAuthUtil />
          <Toaster
            position="top-center"
            toastOptions={{
              style: {
                borderRadius: "8px",
                background: "#151212",
                color: "#fff",
              },
            }}
          />
          <Header />
          <div className="py-8">{children}</div>
          <Footer />
        </GoogleAuthProvider>
      </body>
    </html>
  );
}
