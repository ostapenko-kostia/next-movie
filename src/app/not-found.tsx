import Link from "next/link";

export default function NotFound() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-5">
      <div className="flex items-center justify-center gap-5">
        <h2 className="after:content-['|'] after:ml-5">404</h2>
        <p>This page could not be found.</p>
      </div>
      <Link className="text-accent" href="/">Home</Link>
    </div>
  );
}
