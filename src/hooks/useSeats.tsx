"use client";

import Seat from "@/components/movie/Seat";
import { ISeat } from "@/interfaces/interfaces";
import { useEffect, useState } from "react";

export default function useSeats(seats: ISeat[] | undefined | null) {
  const [seatsJSX, setSeatsJSX] = useState<JSX.Element>(<div className="w-full text-nowrap">No showtimes for this movie :(</div>);
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);

  useEffect(() => {
    if (seats) {
      setSeatsJSX(
        <>
          {seats.sort((a, b) => a.seat_id - b.seat_id).map((seat) => (
            <Seat
              key={seat.seat_id}
              isAvailable={seat.availability}
              color={!seat.availability ? "booked" : selectedSeats?.find((fseat) => fseat === seat.seat_id) ? "primary" : "secondary"}
              popupText={`${seat.row_num}-${seat.seat_num}`}
              onClick={() => {
                if (selectedSeats?.find((fseat) => fseat === seat.seat_id)) {
                  setSelectedSeats(selectedSeats.filter((fseat) => fseat !== seat.seat_id));
                } else {
                  setSelectedSeats([...(selectedSeats || []), seat.seat_id]);
                }
              }}
            />
          ))}
        </>
      );
    }
  }, [seats, selectedSeats]);

  return { seatsJSX, selectedSeats };
}
