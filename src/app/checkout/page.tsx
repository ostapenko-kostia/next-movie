"use client";

import { notFound, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import instance from "@/api/api.interceptor";
import { getContentType } from "@/api/api.helper";
import { AxiosResponse } from "axios";
import { ApiRoutes } from "@/interfaces/interfaces";

interface CheckoutResponse {
  movie_component_response: {
    title: string;
    description: string;
    director: string;
    duration: number;
    poster_url: string;
  };
  showtime_component_response: {
    starting_date: string;
    theater: string;
  };
  seat_component_response: {
    seats: {
      "Seat#: ": string;
      "Row#: ": string;
    }[];
  };
  pricing_component_response: {
    price_per_ticket: number;
    subtotal: number;
    discounts: number;
    taxes: number;
    total_amount: number;
  };
  checkout_stripe_session: string;
}

function checkoutPage() {
  // Params
  const params = useSearchParams();
  const showtime_id = params.get("showtime");
  const reserverdSeats = params.get("seats")?.replace(" ", "").split(",");
  const email = params.get("email");

  // Inits
  const [data, setData] = useState<CheckoutResponse | undefined>(undefined);
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { push: navigate } = useRouter();

  // Check if all params are valid
  useEffect(() => {
    if (!showtime_id || !reserverdSeats || !reserverdSeats[0] || !email) notFound();
  }, [showtime_id, reserverdSeats, email]);

  // Error handling
  useEffect(() => {
    if (isError) {
      toast.error("Something went wrong, please try again later", { duration: 4000 });
      navigate("/");
    }
  }, [isError]);

  // Fetching data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const checkoutResponse = await instance.post<string, AxiosResponse<CheckoutResponse>>(
          ApiRoutes.createCheckoutSession,
          JSON.stringify({ showtime_id: Number(showtime_id), buyer_email: email, listOfSeats_id: reserverdSeats }),
          { headers: getContentType() }
        );
        setIsError(!!!checkoutResponse);
        setData(checkoutResponse.data);
      } catch (error) {
        notFound();
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full">
      <div className="container mx-auto text-center flex flex-col items-center gap-10">
        <h1 className="text-2xl font-bold">Checkout details</h1>
        {isLoading ? (
          <div>Loading...</div>
        ) : isError ? null : (
          <>
            <ul className="flex flex-col gap-5 text-wrap">
              <li className="text-lg">
                Movie: <span className="font-bold text-secondary">{data?.movie_component_response.title}</span>
              </li>
              <li className="text-lg">
                Starting Date: <span className="font-bold text-secondary">{data?.showtime_component_response.starting_date}</span>
              </li>
              <li className="text-lg">
                Theater: <span className="font-bold text-secondary">{data?.showtime_component_response.theater}</span>
              </li>
              <li className="text-lg">
                Seats: <span className="font-bold text-secondary">{data?.seat_component_response.seats.map((seat) => `${seat["Row#: "]}-${seat["Seat#: "]}`).join(", ")}</span>
              </li>
              <li className="text-lg">
                Price Per Ticket: <span className="font-bold text-secondary">${data?.pricing_component_response.price_per_ticket}</span>
                <br />
                Subtotal: <span className="font-bold text-secondary">${data?.pricing_component_response.subtotal}</span>
                <br />
                Discounts: <span className="font-bold text-secondary">${data?.pricing_component_response.discounts}</span>
                <br />
                Taxes: <span className="font-bold text-secondary">${data?.pricing_component_response.taxes}</span>
                <br />
                Total Amount: <span className="font-bold text-secondary">${data?.pricing_component_response.total_amount}</span>
              </li>
            </ul>
            <a href={data?.checkout_stripe_session} className="text-lg font-semibold text-white bg-primary w-fit mx-auto px-5 py-2 rounded-xl">
              Pay with Stripe
            </a>
          </>
        )}
      </div>
    </motion.section>
  );
}

export default checkoutPage;
