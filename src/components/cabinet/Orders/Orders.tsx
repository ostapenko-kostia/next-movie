"use client";

import styles from "./styles.module.scss";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import userService from "@/services/user/user.service";
import toast from "react-hot-toast";
import { IMovie, ISeat, IShowtime, ITheater, SeatResponse } from "@/interfaces/interfaces";
import Image from "next/image";

interface Props {
  movies: IMovie[];
  showtimes: IShowtime[];
  seats: SeatResponse[];
}

function Orders({ movies, showtimes, seats }: Props) {
  const swiperRef = useRef<SwiperRef>(null);
  const [orders, setOrders] = useState<
    {
      showtime_id: number;
      listOfSeats_id: number[];
      buyer_email: string;
      final_cost: number;
    }[]
  >();
  useEffect(() => {
    async function getData() {
      try {
        const response = await userService.getOrders();
        setOrders(response);
      } catch (err) {
        toast.error("Something went wrong");
      }
    }
    getData();
  }, []);
  return (
    <div>
      <div className="my-4 w-full flex items-center justify-between">
        <h3 className="text-2xl">My orders</h3>
        <div className="flex items-center gap-5">
          <button onClick={() => swiperRef.current?.swiper.slidePrev()} className="aspect-square rounded-full bg-bg-color-alt p-3 text-lg duration-150 transition-transform hover:scale-105">
            <ChevronLeft />
          </button>
          <button onClick={() => swiperRef.current?.swiper.slideNext()} className="aspect-square rounded-full bg-bg-color-alt p-3 text-lg duration-150 transition-transform hover:scale-105">
            <ChevronRight />
          </button>
        </div>
      </div>
      <Swiper
        ref={swiperRef}
        breakpoints={{
          960: {
            slidesPerView: 3,
          },
          820: {
            slidesPerView: 2,
          },
          0: {
            slidesPerView: 1,
          },
        }}
        slidesPerView={3}
        spaceBetween={60}
        direction="horizontal"
        loop
      >
        {orders?.map((order) => {
          const showtime = showtimes.find((showtime) => showtime.showtime_id === order.showtime_id);
          const movie = movies.find((movie) => movie.movie_id === showtime?.movie_id);
          const currentSeats = seats.find((seat) => seat.showtime_id === order.showtime_id)?.all_seats_per_showtime;
          const selectedSeats = currentSeats?.filter((seat) => order.listOfSeats_id.includes(seat.seat_id));
          return (
            <SwiperSlide key={Math.random()}>
              <div className={styles.slide}>
                <div className="w-full aspect-square rounded-md relative">
                  <Image priority src={movie?.poster_url as string} alt={movie?.title as string} fill sizes="100%, 100%" style={{ objectFit: "cover" }} />
                </div>
                <h4 className="text-xl font-bold my-3">{movie?.title}</h4>
                <p className="flex flex-col items-center">
                  Starting Date: <b className="text-secondary">{showtime?.starting_date.split("T").join(" at ")}</b>
                </p>
                <p className="flex flex-col items-center">
                  Total: <b className="text-secondary">${order.final_cost}</b>
                </p>
                <p className="flex flex-col items-center">
                  Seats:
                  <b className="text-secondary inline-flex">
                    {selectedSeats
                      ?.sort((a, b) => a.seat_id - b.seat_id)
                      .map((seat) => `${seat.row_num}-${seat.seat_num}`)
                      .join(", ")}
                  </b>
                </p>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

export default Orders;
