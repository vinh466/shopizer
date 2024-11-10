import { Method } from 'axios';
import baseApi from './base-api';

// export const fetcher = url => axios.get(url).then(res => res.data)
// export const postFetcher = (url, data) => axios.post(url, data).then(res => res.data)

export const fetcher = async (url: string, body = {}, method: Method = 'GET', app:'admin'| 'buyer' = 'buyer') =>
  await baseApi(url, body, method, app);
