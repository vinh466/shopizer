import { PRODUCT_ENDPOINT } from '@shopizer/constants';
import baseApi from '../base-api';
import { SignInFormValues, SignUpFormValues } from '@shopizer/types/form';

async function getList(payload: any) {
  return await baseApi(PRODUCT_ENDPOINT.LIST, payload, 'GET');
}

async function getProduct(id: string) {
  return await baseApi(PRODUCT_ENDPOINT.GET + id, {}, 'GET');
}

async function create(payload: any) {
  return await baseApi(PRODUCT_ENDPOINT.CREATE, payload, 'POST');
}

async function remove(id: string) {
  return await baseApi(PRODUCT_ENDPOINT.DELETE + id, {}, 'DELETE');
}
async function update(id: string, payload: any) {
  return await baseApi(PRODUCT_ENDPOINT.UPDATE + id, payload, 'PATCH');
}
export const productApi = {
  getList, create, remove, getProduct, update
};
