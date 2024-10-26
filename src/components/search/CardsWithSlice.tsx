"use client";

import { IMovie } from "@/interfaces/interfaces";
import Card from "../layout/Card";
import { useState } from "react";

interface CardsWithSliceProps {
  movies: IMovie[];
  step?: number;
}

function CardsWithSlice({ movies, step = 4 }: CardsWithSliceProps) {
  const [numMovies, setNumMovies] = useState<number>(step);
  const handleSeeMore = () => setNumMovies(numMovies + 4);
  return (
    <section className="flex flex-col w-full gap-10 mt-7">
      {movies.slice(0, numMovies).map((movie) => (
        <Card key={movie.movie_id} movie={movie} />
      ))}
      {movies.length > numMovies && (
        <button onClick={handleSeeMore} className="text-lg font-semibold text-white bg-primary w-fit mx-auto px-5 py-2 rounded-xl">
          See More
        </button>
      )}
    </section>
  );
}

export default CardsWithSlice;
