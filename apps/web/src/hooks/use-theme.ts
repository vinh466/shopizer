import { themeState } from '@shopizer/stores';
import { useRecoilState } from 'recoil';

export function useTheme() {
  const [theme, setTheme] = useRecoilState(themeState);

  return {
    theme: theme,
    toggleTheme: () =>
      setTheme((theme: any) => (theme === 'dark' ? 'light' : 'dark')),
  };
}
