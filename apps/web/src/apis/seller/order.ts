import { ORDER_ENDPOINT, SELLER_ENDPOINT } from '@shopizer/constants';
import baseApi from '../base-api';

async function confirm(payload: any) {
    return await baseApi(ORDER_ENDPOINT.SELLER_CONFIRM_ORDER, payload, 'PATCH');
}
async function shipping(payload: any) {
    return await baseApi(ORDER_ENDPOINT.SELLER_SHIPPING_CONFIRM_ORDER, payload, 'PATCH');
}
async function cancel(payload: any) {
    return await baseApi(ORDER_ENDPOINT.BUYER_CANCEL_ORDER, payload, 'PATCH');
}
export const sellerOrderApi = {
    confirm, shipping, cancel
};
