export default async function fetchGet(url: string) {
  const res = await fetch(url);
  return await res.json();
}
