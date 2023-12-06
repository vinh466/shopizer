'use client';

import { adminApi } from '@shopizer/apis/admin/admin';
import { sellerApi } from '@shopizer/apis/seller/seller';
import { ASpinLoadingPage } from '@shopizer/atoms';
import {
  ADMIN_PAGE,
  PUBSUB_UPDATE_SELLER_PROFILE,
  SELLER_PAGE,
} from '@shopizer/constants';
import { TAdminLayout, TSaleLayout } from '@shopizer/templates';
import { useLayoutEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { TLAdminAuthGuard } from 'src/components/templates/providers/admin-auth.template.template';
import { TLAuthGuard } from 'src/components/templates/providers/auth.template.template';
import { adminSessionState } from 'src/stores/admin-session.store';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const [session, updateSession] = useRecoilState<any>(adminSessionState);

  useLayoutEffect(() => {
    const getProfile = () => {
      adminApi.getProfile().then((res: any) => {
        if (res.errorStatusCode) {
        } else {
          updateSession((state: any) => ({
            ...state,
            admin: res,
          }));
          setLoading(false);
        }
      });
    };
    getProfile();
    console.log('subscribe get admin profile');
    const sub = PubSub.subscribe(PUBSUB_UPDATE_SELLER_PROFILE, () => {
      console.log('c');
      getProfile();
    });
    return () => {
      PubSub.unsubscribe(sub);
    };
  }, []);

  if (loading) return <ASpinLoadingPage />;
  else
    return (
      <TLAdminAuthGuard authRequire authRedirect={ADMIN_PAGE.SIGN_IN.PATH}>
        <TAdminLayout>{children}</TAdminLayout>
      </TLAdminAuthGuard>
    );
};

export default AdminLayout;
