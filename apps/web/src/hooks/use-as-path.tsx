import { usePathname, useSearchParams } from 'next/navigation';

export function useAsPath() {
  const routeParams = useSearchParams().toString();
  const routePathName = usePathname();
  return routePathName + (routeParams ? `?${routeParams}` : '');
}
