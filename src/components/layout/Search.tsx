import { SearchIcon } from "lucide-react";

interface SearchProps {
  className: string;
}

function Search({ className }: SearchProps) {
  return (
    <search className={`${className} h-full`}>
      <form autoComplete="off" action="/search" className="py-5 h-full flex items-center gap-2">
        <button type="submit">
          <SearchIcon />
        </button>
        <input
          className="h-full w-full bg-transparent 
                text-white placeholder:text-white 
                focus-visible:outline-none"
          type="text"
          name="search"
          placeholder="Search"
        />
      </form>
    </search>
  );
}

export default Search;
