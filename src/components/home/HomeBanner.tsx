import Link from "next/link";

function HomeBanner() {
  return (
    <div className="w-full h-auto min-h-64 p-6 rounded-xl" style={{ background: "linear-gradient(to top right, #191919, #120c0d)" }}>
      <div className="text-white flex flex-col items-center w-full text-center justify-between">
        <h1 className="text-3xl max-xs:text-lg font-bold mb-5">Discover the Best Movies of the Year</h1>
        <p className="text-base max-xs:text-sm text-secondary">Find the most critically acclaimed and popular movies of the year, all in one place. Browse our curated list of top films and discover your new favorite movie!</p>
        <Link href='/search' className="bg-primary px-5 py-3 rounded-lg mt-5 transition-transform duration-150 ease-in hover:scale-110">Browse Movies</Link>
      </div>
    </div>
  );
}

export default HomeBanner;
