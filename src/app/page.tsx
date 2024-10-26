import HomeBanner from "@/components/home/HomeBanner";
import HomeSlider from "@/components/home/HomeSlider";
import Slider from "@/components/util/Slider";
import { IMovie } from "@/interfaces/interfaces";
import getServerSideCategories from "@/server-actions/getServerSideCategories";
import { Metadata } from "next";
import Link from "next/link";
import * as motion from "framer-motion/client";
import { getMovies } from "@/server-actions/getData";

export const metadata: Metadata = {
  title: "Home",
};

export const revalidate = 60;

export default async function Home() {
  const categories = await getServerSideCategories();
  const movies: IMovie[] = await getMovies();
  return (
    <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full">
      <div className="container mx-auto overflow-x-hidden flex flex-col gap-12 max-xs:px-5">
        <Slider step={200}>
          <div className="flex items-center gap-3 w-full overflow-x-scroll no-scrollbar scroll-smooth">
            {categories.map((category) => (
              <Link
                href={`/search?category=${category}`}
                key={category}
                className="p-4 bg-gray text-primary font-semibold rounded-2xl text-nowrap transition-transform duration-150 ease-in hover:scale-105"
              >
                {category}
              </Link>
            ))}
          </div>
        </Slider>

        <HomeBanner />

        <HomeSlider movies={movies.reverse()} />
      </div>
    </motion.main>
  );
}
