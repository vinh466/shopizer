'use client';
import { ADMIN_PAGE, COMMON_PAGE, SELLER_PAGE } from '@shopizer/constants';
import { SessionState, sessionState } from '@shopizer/stores';
import { Spin, notification } from 'antd';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { adminSessionState } from 'src/stores/admin-session.store';

var rootCounter = 0;
interface TLAuthGuardProps {
  children: React.ReactNode;
  authRequire?: boolean;
  authRedirect?: string;
  root?: boolean;
}

export function TLAdminAuthGuard(props: TLAuthGuardProps) {
  const [loading, setLoading] = useState(true);
  const [session, updateSession] = useRecoilState<any>(adminSessionState);
  const router = useRouter();
  const pathName = usePathname();
  console.log(pathName);
  useEffect(() => {
    if (!props.root) return;
    rootCounter += 1;
    if (rootCounter > 1) {
      console.warn('There should only be 1 root TLAdminAuthGuard in the app');
      return;
    }
    console.log('subscribe token_expired');
    PubSub.subscribe('token_expired', (msg, data) => {
      if (!session.admin) {
        router.replace(props.authRedirect || ADMIN_PAGE.SIGN_IN.PATH);
      }
      updateSession(null as any);
      console.log('token_expired');
    });
  }, []);
  useLayoutEffect(() => {
    if (!props.authRequire) {
      setLoading(false);
      return;
    }
    console.log(session);
    if (!session?.admin) {
      console.log('no auth redirect');
      notification.warning({
        message: 'Thông báo',
        description: 'Bạn cần đăng nhập để tiếp tục',
      });
      router.replace(props.authRedirect || COMMON_PAGE.SIGN_IN.PATH);
      return;
    }

    if (!session.isAuthenticated) {
      updateSession(null as any);
      router.replace(props.authRedirect || COMMON_PAGE.SIGN_IN.PATH);
      return;
    }

    setLoading(false);
  }, [session]);
  if (loading)
    return (
      <Spin
        spinning
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      />
    );
  else return <>{props.children}</>;
}
