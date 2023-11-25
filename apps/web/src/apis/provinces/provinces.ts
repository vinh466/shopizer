import { PROVINCES_ENDPOINT } from '@shopizer/constants';
import baseApi from '../base-api';

async function getNextLevelAddress(payload: {
    nextCode?: string;
}) {
    return await baseApi(PROVINCES_ENDPOINT.NEXT_LEVEL_ADDRESS, payload, 'GET');
}

export const provincesApi = {
    getNextLevelAddress,
};
