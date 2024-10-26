import CardsWithSlice from "@/components/search/CardsWithSlice";
import SearchForm from "@/components/search/SearchForm";
import { IMovie, TCategory } from "@/interfaces/interfaces";
import { getMovies } from "@/server-actions/getData";
import getServerSideCategories from "@/server-actions/getServerSideCategories";
import * as motion from "framer-motion/client";

interface ISearchParams {
  searchParams?: {
    search?: string;
    category?: TCategory;
  };
}

async function SearchPage({ searchParams }: ISearchParams) {
  const params = searchParams;
  const title = params?.search;
  const category = params?.category;

  const allCategories = await getServerSideCategories();

  // TODO: implement search
  const allMovies: IMovie[] = await getMovies();
  const filteredMovies = allMovies.filter((movie) => {
    const matchesTitle = title ? movie.title.toLowerCase().includes(title.toLowerCase()) : true;
    const matchesCategory = category ? movie.category === category : true;
    return matchesTitle && matchesCategory;
  });

  return (
    <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full">
      <div className="container mx-auto flex flex-col items-center max-xs:px-3">
        <h2 className="text-2xl font-bold">Search Results {title ? `for ${title}` : ""}</h2>
        <SearchForm categories={allCategories} />
        <CardsWithSlice movies={filteredMovies} step={4} />
      </div>
    </motion.main>
  );
}

export default SearchPage;
