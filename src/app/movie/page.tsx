import Card from "@/components/layout/Card";
import SelectSeats from "@/components/movie/SelectSeats/SelectSeats";
import { IMovie, ITheater, IShowtime, SeatResponse } from "@/interfaces/interfaces";
import { getMovies, getSeats, getTheaters, getShowtimes } from "@/server-actions/getData";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import * as motion from "framer-motion/client";
import formatTrailerLink from "@/util/formatTrailerLink";

interface ISearchParams {
  searchParams?: {
    id: number;
  };
}

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Movie",
};

async function MoviePage({ searchParams }: ISearchParams) {
  const id: number | undefined = searchParams?.id;

  const movie: IMovie = (await getMovies()).find((m: IMovie) => m.movie_id == id);
  const theaters: ITheater[] = await getTheaters();
  const showtimes: IShowtime[] = await getShowtimes();
  const seats: SeatResponse[] = await getSeats();

  if (!id || !movie) notFound();

  return (
    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="container mx-auto flex flex-col gap-6 max-xs:px-4">
        <div className="w-full flex items-center gap-7 justify-between px-64 max-960:px-32 max-md:px-0">
          <iframe src={formatTrailerLink(movie.trailer_url)} className="w-full aspect-video"></iframe>
        </div>
        <Card isLink={false} isHoverTransition={false} movie={movie} />
        <SelectSeats movieID={id} allSeats={seats} theaters={theaters} showtimes={showtimes} />
      </div>
    </motion.section>
  );
}

export default MoviePage;
