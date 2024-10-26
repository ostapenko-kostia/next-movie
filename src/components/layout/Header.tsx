import Image from "next/image";
import Search from "./Search";
import Link from "next/link";
import { SearchIcon } from "lucide-react";
import * as motion from "framer-motion/client";
import dynamic from "next/dynamic";
const HeaderButtons = dynamic(() => import("../header/HeaderButtons/HeaderButtons"), { ssr: false });

function Header() {
  return (
    <motion.header initial={{ translateY: -100 }} animate={{ translateY: 0 }} className="bg-bg-color-alt py-3">
      <div className="container flex h-full items-center mx-auto gap-5 max-xs:px-5 max-xs:gap-2">
        <Link href="/search" className="md:hidden">
          <SearchIcon />
        </Link>

        <Link href="/" className="inline-flex items-center justify-center">
          <h1 className="mr-40 inline-flex items-center gap-3 font-bold text-lg max-xs:text-sm max-md:mr-0 transition-transform duration-150 ease-in hover:scale-105">
            <Image priority src="/logo.svg" alt="Logo" width={30} height={30} />
            <span>Next Movie</span>
          </h1>
        </Link>

        <Search className="max-md:hidden" />

        <HeaderButtons />
      </div>
    </motion.header>
  );
}

export default Header;
