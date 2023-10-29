import { persistAtom } from '@shopizer/configs/recoil-persist';
import { atom } from 'recoil';

export const cartState = atom({
  key: 'cartState', // unique ID (with respect to other atoms/selectors)
  default: null, // default value (aka initial value)
  effects_UNSTABLE: [persistAtom],
});
