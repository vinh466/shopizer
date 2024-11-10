import { BUYER_ENDPOINT, ADMIN_ENDPOINT } from '@shopizer/constants';
import baseApi from '../base-api';

async function getProfile() {

    return await baseApi(ADMIN_ENDPOINT.PROFILE, {}, 'GET', 'admin');
}
async function changgeSellerStatus(sellerId: string, status: 'VERIFIED' | 'PENDING' | 'BLOCKED' | 'REJECTED') {
    return await baseApi(ADMIN_ENDPOINT.CHANGGE_SELLER_STATUS, { sellerId, status }, 'PATCH', 'admin');
}
export const adminApi = {
    getProfile, changgeSellerStatus

}
