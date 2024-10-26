"use client";

import useSeats from "@/hooks/useSeats";
import useSelect from "@/hooks/useSelect";
import { IShowtime, ITheater, SeatResponse } from "@/interfaces/interfaces";
import { useAuth } from "@/store/authStore";
import toast from "react-hot-toast";

interface Props {
  theaters: ITheater[];
  showtimes: IShowtime[];
  allSeats: SeatResponse[];
  movieID: number;
}

function SelectSeats({ theaters, showtimes, allSeats, movieID }: Props) {
  // Inits
  const { isAuth, user } = useAuth();

  // Selects
  const { selectJSX: ShowtimeSelect, selectValue: selectedShowtime } = useSelect({
    options: showtimes
      ?.filter((s) => s.movie_id == movieID)
      ?.sort((a, b) => a.showtime_id - b.showtime_id)
      ?.map((showtime) => ({ value: JSON.stringify(showtime), label: `${showtime.starting_date.replace("T", " at ")}` })),
    settings: { placeholder: "Select a Showtime" },
  });

  // Seats
  const { seatsJSX, selectedSeats } = useSeats(
    selectedShowtime ? allSeats?.find((s) => s.showtime_id == JSON.parse(selectedShowtime).showtime_id)?.all_seats_per_showtime.sort((a, b) => a.seat_id - b.seat_id) : undefined
  );

  // Handlers
  const reservationHandler = () => {
    const email = user?.email || prompt("Please, enter your email (enter only valid email)");
    if (selectedShowtime && selectedSeats && email) {
      window.location.href = `/checkout?showtime=${JSON.parse(selectedShowtime).showtime_id}&seats=${selectedSeats}&email=${email}`;
    } else {
      toast.error("Something went wrong");
    }
  };

  const theater = selectedShowtime ? theaters?.find((t) => t.theater_id === JSON.parse(selectedShowtime).theater_id) : undefined;

  return (
    <div className="w-full bg-bg-color-alt h-auto p-8 rounded-2xl max-md:px-5">
      <div className="w-full flex items-center justify-between max-md:flex-col max-md:gap-5">
        <div className="text-left max-md:text-center">
          <h2 className="text-xl">Select Your Seats</h2>
          <p className="text-secondary">Choose a seat for you to watch a movie</p>
        </div>
        {selectedShowtime && theater && (
          <div>
            <ul className="text-center">
              <li>
                Theater: <b style={{ color: theater?.name.toLowerCase() }}>{theater?.name}</b>
              </li>
              <li>
                Date: <b>{JSON.parse(selectedShowtime).starting_date.split("T")[0]}</b>
              </li>
              <li>
                Time: <b>{JSON.parse(selectedShowtime).starting_date.split("T")[1]}</b>
              </li>
              <li>
                Screen Type: <b>{JSON.parse(selectedShowtime).screen_type}</b>
              </li>
              <li>
                Base Price Per Seat: <b>${JSON.parse(selectedShowtime).price_per_seat}</b>
              </li>
            </ul>
          </div>
        )}

        <div className="flex items-center gap-5 [&>select]:w-full max-sm:flex-col max-sm:w-full">
          <ShowtimeSelect />
        </div>
      </div>
      {selectedShowtime && theater && (
        <div className="w-full flex flex-col items-center">
          <div className="w-1/3 flex flex-col items-center max-960:w-2/5 max-md:w-2/3 max-sm:w-full max-sm:px-5">
            <div className="w-full mx-auto flex flex-col items-center mt-8">
              <svg width="100%" height="100" preserveAspectRatio="none" viewBox="0 0 500 100" xmlns="http://www.w3.org/2000/svg">
                <path d="M 0 70 Q 250 30, 500 70" stroke={theater.name.toLowerCase() || "#3caf2c"} strokeWidth="10" fill="none" />
              </svg>
              <h3 className="text-lg uppercase font-bold mt-[-30px]" style={{ color: theater.name.toLowerCase() || "#3caf2c" }}>
                Screen
              </h3>
            </div>
            <div className="mt-14 w-full grid grid-cols-10 gap-5 place-items-center max-xs:gap-2">{seatsJSX}</div>
            <ul className="flex gap-5 w-auto mt-8 max-[350px]:flex-col max-[350px]:items-center max-[350px]:text-center">
              <li className="flex items-center gap-2">
                <div className="bg-bg-color w-4 h-4 rounded-md" />
                Booked
              </li>
              <li className="flex items-center gap-2">
                <div className="bg-secondary w-4 h-4 rounded-md" />
                Available
              </li>
              <li className="flex items-center gap-2">
                <div className="bg-primary w-4 h-4 rounded-md" />
                Selected
              </li>
            </ul>
          </div>
          <div className="w-full flex justify-center mt-14 items-center">
            <button onClick={reservationHandler} className="bg-primary text-white px-8 py-3 rounded-lg">
              Book now
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SelectSeats;
