import { persistAtom } from '@shopizer/configs/recoil-persist';
import { atom, selector } from 'recoil';
import { cartState } from '.';

export type SessionState = {
    accessToken: string,
    refreshToken: string,
    admin?: any,
    isAuthenticated: boolean,
};
const defaultState: SessionState = {
    accessToken: '',
    refreshToken: '',
    admin: null as any,
    isAuthenticated: false,
};
const adminSessionStateAtom = atom<SessionState>({
    key: 'adminSessionState', // unique ID (with respect to other atoms/selectors)
    default: defaultState, // default value (aka initial value)
    effects_UNSTABLE: [persistAtom],
});
export const adminSessionState = selector<any>({
    key: 'adminSessionStateSelector',
    get: ({ get }) => get(adminSessionStateAtom),
    set: ({ set, reset }, newValue) => {
        if (newValue === null) {
            set(adminSessionStateAtom, { ...defaultState });
            reset(cartState);
            return;
        } else {
            set(adminSessionStateAtom, newValue);
        }
        localStorage.setItem('admin-accessToken', newValue?.accessToken || '');
        localStorage.setItem('admin-refreshToken', newValue?.refreshToken || '');
    },
});
