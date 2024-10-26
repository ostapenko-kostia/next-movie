import { IMovie } from "@/interfaces/interfaces";
import Image from "next/image";
import Link from "next/link";

interface Props {
  movie: IMovie;
  isLink?: boolean;
  isHoverTransition?: boolean;
}

function Card({ movie, isLink = true, isHoverTransition = true }: Props) {
  const cardJSX = (
    <article
      className={`w-full h-[300px] max-md:h-auto max-md:gap-5 flex items-center max-md:flex-col gap-10 p-5 bg-bg-color-alt rounded-2xl ${
        isHoverTransition && "transition-transform duration-500 ease-in hover:scale-[1.01]"
      }`}
    >
      <div className="relative h-full w-72 max-md:h-52 max-md:w-full">
        <Image priority src={movie.poster_url} alt={movie.title} fill sizes="100%, 100%" style={{ objectFit: "cover" }} />
      </div>
      <div className="flex flex-col items-start w-full gap-5">
        <h2 className="text-2xl max-xs:text-lg font-bold">{movie.title}</h2>
        <h3 className="text-sm">{movie.category}</h3>
        <p className="text-sm mt-auto line-clamp-4 text-secondary">{movie.description}</p>
      </div>
    </article>
  );

  if (isLink) return <Link href={`/movie?id=${movie.movie_id}`}>{cardJSX}</Link>;
  else return cardJSX;
}

export default Card;
