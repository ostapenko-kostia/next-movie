'use server'

import { TCategory } from "@/interfaces/interfaces";

export default async function getServerSideCategories() {
  const categories: TCategory[] = ["Comedy", "Romance", "Science Fiction", "Animation", "Historical", "Action", "Horror", "Western", "Crime", "Mystery", "Drama", "Thriller", "Adventure", "Musical", "Documentary"];
  return categories;
}
