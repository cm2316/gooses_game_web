export default async function fetcher<T>(
  input: NodeJS.fetch.RequestInfo,
  init?: RequestInit,
): Promise<T> {
  const res = await fetch(input, init);
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

export function getSearchParams(params?: Record<string, string>) {
  const searchParams = new URLSearchParams(params);
  return searchParams.toString();
}
