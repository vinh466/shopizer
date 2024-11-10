import axios, { Method } from 'axios';
import { notification } from 'antd';
import { AUTH_ENDPOINT,  COMMON_PAGE, RECOIL_KEY } from '@shopizer/constants';
import { authApi } from './auth/auth';
import Cookies from 'js-cookie';
import PubSub from 'pubsub-js';
import { isNumber } from 'lodash';

async function baseApi<Res = any>(
  endpoint: string,
  body = {},
  method: Method = 'GET',
  app: 'admin' | 'buyer' | 'seller' = 'buyer',
): Promise<Res> {
  const url = process.env.NEXT_PUBLIC_BACKEND_DOMAIN + endpoint;
  
  const local = JSON.parse(localStorage.getItem(RECOIL_KEY) as any) ?? null;
  const token = app === 'admin' ? local?.adminSessionState?.accessToken : localStorage.getItem('accessToken') || null;
  const refreshToken = localStorage.getItem('refreshToken') || null;
  
  try {
    let headers: any = {
      'Content-type': 'application/json; charset=UTF-8',
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    if (body instanceof FormData) {
      headers['Content-type'] = 'multipart/form-data';
    }
    let config: any = {
      method: method,
      headers: headers,
      withCredentials: true,
      // proxy: proxy
    };
    if (method === 'GET') config['params'] = body;
    else config['data'] = body;

    const response = await axios(url, config);
    return (response.data?.data ?? response.data) as Res;
  } catch ({ err, request, response }: any) {
    if (response?.status == 401 && endpoint !== AUTH_ENDPOINT.REFRESH) {
      const cachePrevRequest = {
        endpoint,
        method,
        body,
      };
      // Call Refresh Token
      const user = local?.userState ?? null;
      if (!user) {
        PubSub.publish('token_expired', null);
        // window.location.href = COMMON_PAGE.SIGN_IN.PATH;
      }
      const remember = local?.rememberState ?? null;
      if (!remember) {
        PubSub.publish('token_expired', null);
      } else {
        refreshToken && Cookies.set('Refresh', refreshToken);
        const result: any = await authApi.refreshToken({ email: user.email });

        if (!isNumber(result.errorStatusCode)) {
          localStorage.setItem('accessToken', result.accessToken);
          localStorage.setItem('refreshToken', result.refreshToken);
          Cookies.set('Refresh', result.refreshToken);
          // Cookies.set('Authentication', result.accessToken)
          return await baseApi(
            cachePrevRequest.endpoint,
            cachePrevRequest.body,
            cachePrevRequest.method,
          );
        } else {
          // window.location.href = COMMON_PAGE.SIGN_IN.PATH
          PubSub.publish('token_expired', null);
        }
      }
    }

    const message = response?.data?.message;
    if (Array.isArray(message)) {
      message.map((msg) =>
        notification.error({
          message: msg ?? "API System's error",
        }),
      );
    } else {
      notification.error({
        message: message ?? "API System's error",
      });
    }
    // PubSub.publishSync('error_page', response?.status ?? 500);
    return {
      err,
      message: response?.data?.message ?? "API System's error",
      errorStatusCode: response?.status ?? 500,
      ...response?.data,
    };
  }
}

export default baseApi;
