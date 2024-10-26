import Orders from "@/components/cabinet/Orders/Orders";
import { Metadata } from "next";
import * as motion from "framer-motion/client";
import dynamic from "next/dynamic";
import { getMovies, getSeats, getShowtimes } from "@/server-actions/getData";
const AccountInfo = dynamic(() => import("@/components/cabinet/AccountInfo"), { ssr: false });

export const metadata: Metadata = {
  title: "User Cabinet",
};

async function CabinetPage() {
  const movies = await getMovies();
  const showtimes = await getShowtimes();
  const seats = await getSeats();
  return (
    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full">
      <div className="container mx-auto max-[520px]:px-5">
        <h2 className="text-4xl font-semibold text-center">My cabinet</h2>
        <Orders showtimes={showtimes} movies={movies} seats={seats} />
        <AccountInfo />
      </div>
    </motion.section>
  );
}

export default CabinetPage;
