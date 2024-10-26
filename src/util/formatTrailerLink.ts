export default function formatTrailerLink(url: string) {
  const videoId = new URL(url).searchParams.get("v");
  if (videoId) {
    return `https://www.youtube.com/embed/${videoId}`;
  } else {
    return `https://www.youtube.com/embed/${new URL(url).pathname.split("/")[1]}`;
  }
}
