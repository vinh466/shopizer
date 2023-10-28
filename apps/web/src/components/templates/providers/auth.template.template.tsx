'use client';
import { sessionState } from '@shopizer/stores';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

export function TLAuthGuard({ children }: { children: React.ReactNode }) {
  const [session, updateSession] = useRecoilState(sessionState);
  useEffect(() => {
    console.log(session);
    updateSession({
      ...session,
      user: {
        ...session?.user,
        firstName: 'Vinh',
        lastName: 'Nguyen',
        email: '',
      },
      isAuthenticated: true,
    });
  }, []);
  return <>{children}</>;
}
