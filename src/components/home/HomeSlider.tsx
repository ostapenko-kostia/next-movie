"use client";

import { IMovie } from "@/interfaces/interfaces";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import "swiper/css";
import Card from "../layout/Card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";

interface Props {
  movies: IMovie[];
}

function HomeSlider({ movies }: Props) {
  const swiperRef = useRef<SwiperRef>(null);
  return (
    <section className="w-full">
      <h2 className="text-2xl font-bold mb-5">Trending</h2>
      <div className="w-full flex items-center gap-5">
        <button onClick={() => swiperRef.current?.swiper.slidePrev()} className="rounded-full text-lg bg-gray p-3 max-xs:p-1 flex items-center justify-center">
          <ChevronLeft />
        </button>
        <Swiper ref={swiperRef} slidesPerView={1} spaceBetween={100} speed={600}>
          {movies.map((movie) => (
            <SwiperSlide key={movie.movie_id}>
              <Card movie={movie} />
            </SwiperSlide>
          ))}
        </Swiper>
        <button onClick={() => swiperRef.current?.swiper.slideNext()} className="rounded-full text-lg bg-gray p-3 max-xs:p-1 flex items-center justify-center">
          <ChevronRight />
        </button>
      </div>
    </section>
  );
}

export default HomeSlider;
