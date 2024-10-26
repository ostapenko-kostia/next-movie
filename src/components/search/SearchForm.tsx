"use client";

import { TCategory } from "@/interfaces/interfaces";
import { SearchIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

function SearchForm({ categories }: { categories: TCategory[] }) {
  const [searchValue, setSearchValue] = useState<string>(useSearchParams().get("search") || "");
  return (
    <form className="my-5 flex flex-col items-center gap-5">
      <search className="flex items-center justify-between px-4 w-full bg-transparent text-white placeholder:text-white focus-visible:outline-none border-2 border-secondary rounded-xl">
        <input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          type="text"
          className="bg-transparent border-none px-4 py-2 focus-visible:outline-none"
          placeholder="Search"
          name="search"
        />
        <button type="submit">
          <SearchIcon />
        </button>
      </search>
      <select name="category" id="category" className="w-full px-4 bg-transparent py-2 text-white focus-visible:outline-none border-2 border-secondary rounded-xl">
        <option value="" hidden>
          Select category...
        </option>
        <option value="" className="bg-bg-color text-white">
          All Categories
        </option>
        {categories.map((category) => (
          <option className="bg-bg-color text-white" key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      <button type="submit" className="bg-primary text-white px-4 py-2 rounded-xl">
        Apply
      </button>
    </form>
  );
}

export default SearchForm;
