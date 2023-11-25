import { CATEGORY_ENDPOINT } from '@shopizer/constants';
import baseApi from '../base-api';

async function getList(payload: any) {
  return await baseApi(CATEGORY_ENDPOINT.LIST, payload, 'GET');
}

export const categoryApi = {
  getList,
};
