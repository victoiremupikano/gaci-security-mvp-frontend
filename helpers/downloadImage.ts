export default async function downloadImage(url: string) {
  return await fetch(url).then((res) => res.blob());
}
