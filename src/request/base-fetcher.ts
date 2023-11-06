import fetcher, { getSearchParams } from '@/request/fetcher';
interface Props {
  url: string;
  host?: string;
  data?: Record<string, any>;
  params?: Record<string, any>;
}
export default async function BaseFetcher<T>(
  { url, host = process.env.NEXT_PUBLIC_API_DOMAIN, data, params }: Props,
  init?: RequestInit,
): Promise<T> {
  let _url = `${host}${url}`;
  if (params) {
    _url += `?${getSearchParams(params)}`;
  }
  let _init = init;
  if (data) {
    _init = { ..._init, body: JSON.stringify(data) };
  }
  return fetcher<T>(_url, _init);
}
