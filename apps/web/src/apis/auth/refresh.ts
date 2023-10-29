import { AUTH_ENDPOINT } from '@shopizer/constants';
import baseApi from '../base-api';

async function refreshTokenApi(payload: any) {
  return await baseApi(AUTH_ENDPOINT.REFRESH, 'POST', payload);
}

export default refreshTokenApi;
