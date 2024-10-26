const AdminPanel = dynamic(() => import("@/components/admin/AdminPanel"), { ssr: false });
import { getMovies, getTheaters } from "@/server-actions/getData";
import getServerSideCategories from "@/server-actions/getServerSideCategories";
import dynamic from "next/dynamic";
import * as motion from "framer-motion/client";

export const revalidate = 60;

async function AdminPanelPage() {
  const movies = await getMovies();
  const theaters = await getTheaters();
  const categories = await getServerSideCategories();

  return (
    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <AdminPanel movies={movies} theaters={theaters} categories={categories} />
    </motion.section>
  );
}

export default AdminPanelPage;
