import { persistAtom } from '@shopizer/configs/recoil-persist';
import { DefaultValue, atom, selector, useResetRecoilState } from 'recoil';
import { cartState } from '.';
import { isEmpty } from 'lodash';

export type SessionState = {
  accessToken: string,
  refreshToken: string,
  user?: any,
  seller?: {
    [key: string]: any
    status: 'PENDING' | 'VERIFIED' | 'REJECTED' | 'BLOCKED'
  },
  isAuthenticated: boolean,
};
const defaultState: SessionState = {
  accessToken: '',
  refreshToken: '',
  user: null as any,
  seller: null as any,
  isAuthenticated: false,
};
const sessionStateAtom = atom<SessionState>({
  key: 'sessionState', // unique ID (with respect to other atoms/selectors)
  default: defaultState, // default value (aka initial value)
  effects_UNSTABLE: [persistAtom],
});
export const sessionState = selector<any>({
  key: 'sessionStateSelector',
  get: ({ get }) => get(sessionStateAtom),
  set: ({ set, reset }, newValue) => {
    if (isEmpty(newValue)) {
      set(sessionStateAtom, { ...defaultState });
      reset(cartState);
      return;
    } else {
      set(sessionStateAtom, newValue);
    }
    localStorage.setItem('accessToken', newValue?.accessToken || '');
    localStorage.setItem('refreshToken', newValue?.refreshToken || '');
  },
});
