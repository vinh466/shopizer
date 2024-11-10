'use client';
import { COMMON_PAGE } from '@shopizer/constants';
import { sessionState } from '@shopizer/stores';
import { useRouter } from 'next/navigation';
import { useEffect, useLayoutEffect } from 'react';
import { useRecoilState } from 'recoil';

var rootCounter = 0;
interface TLAuthGuardProps {
  children: React.ReactNode;
  authRequire?: boolean;
  authRedirect?: string;
  root?: boolean;
}

function TLAuthGuard(props: TLAuthGuardProps) {
  const [session, updateSession] = useRecoilState(sessionState);
  const router = useRouter();
  useLayoutEffect(() => {
    if (!session?.user) {
      console.log('no auth redirect');
      router.replace(props.authRedirect || COMMON_PAGE.SIGN_IN.PATH);
      return;
    }
    if (!session.isAuthenticated) {
      updateSession(null);
      router.replace(props.authRedirect || COMMON_PAGE.SIGN_IN.PATH);
    }
  }, [session]);
  return <>{props.children}</>;
}
