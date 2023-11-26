import { SELLER_ENDPOINT } from '@shopizer/constants';
import baseApi from '../base-api';

async function verify(payload: any) {
    return await baseApi(SELLER_ENDPOINT.VERIFY, payload, 'POST');
} 
async function getProfile() {
    return await baseApi(SELLER_ENDPOINT.PROFILE);
}
async function updateProfile(payload: any) {
    return await baseApi(SELLER_ENDPOINT.PROFILE, payload, 'PATCH');
}
export const sellerApi = {
    verify, getProfile, updateProfile, 
};
