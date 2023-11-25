import { AUTH_ENDPOINT } from '@shopizer/constants';
import baseApi from '../base-api';
import { SignInFormValues, SignUpFormValues } from '@shopizer/types/form';

async function signIn(payload: SignInFormValues) {
  return await baseApi(AUTH_ENDPOINT.SIGN_IN, payload, 'POST');
}
async function adminSignIn(payload: SignInFormValues) {
  return await baseApi(AUTH_ENDPOINT.ADMIN_SIGN_IN, payload, 'POST');
}
async function signUp(payload: SignUpFormValues) {
  return await baseApi(AUTH_ENDPOINT.SIGN_UP, payload, 'POST');
}
async function signOut(payload: any) {
  return await baseApi(AUTH_ENDPOINT.SIGN_OUT, payload, 'POST');
}
async function refreshToken(payload: any) {
  return await baseApi(AUTH_ENDPOINT.REFRESH, payload, 'POST');
}

export const authApi = {
  signIn,
  signUp,
  signOut,
  refreshToken,
  adminSignIn
};
