import { BUYER_ENDPOINT, CATEGORY_ENDPOINT } from '@shopizer/constants';
import baseApi from '../base-api';
 
async function order(payload: any) {

    return await baseApi(BUYER_ENDPOINT.ORDER, payload, 'POST');
}
export const buyerApi = { 
    order

}
