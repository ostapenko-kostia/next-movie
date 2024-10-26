"use server";

import { ApiRoutes } from "@/interfaces/interfaces";

export async function getMovies() {
  return await (await fetch(`${process.env.NEXT_PUBLIC_API_URL}${ApiRoutes.getMovies}`)).json();
}

export async function getTheaters() {
  return await (await fetch(`${process.env.NEXT_PUBLIC_API_URL}${ApiRoutes.getAllTheaters}`)).json();
}

export async function getShowtimes() {
  return await (await fetch(`${process.env.NEXT_PUBLIC_API_URL}${ApiRoutes.getFutureShowtimes}`)).json();
}

export async function getSeats() {
  return await (await fetch(`${process.env.NEXT_PUBLIC_API_URL}${ApiRoutes.getAllSeats}`)).json();
}
