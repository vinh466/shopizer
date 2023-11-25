'use client';

import { sellerApi } from '@shopizer/apis/seller/seller';
import { ASpinLoadingPage } from '@shopizer/atoms';
import { PUBSUB_UPDATE_SELLER_PROFILE, SELLER_PAGE } from '@shopizer/constants';
import { sessionState } from '@shopizer/stores';
import { TSaleLayout } from '@shopizer/templates';
import { useLayoutEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { TLAuthGuard } from 'src/components/templates/providers/auth.template.template';

const SellerLayout = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const [session, updateSession] = useRecoilState<any>(sessionState);

  useLayoutEffect(() => {
    const getProfile = () => {
      sellerApi.getProfile().then((res: any) => {
        if (res.errorStatusCode) {
        } else {
          const { seller, ...user } = res;
          const newSellerSession = {
            ...user,
            ...seller,
          };
          updateSession((state: any) => ({
            ...state,
            seller: newSellerSession,
          }));
          setLoading(false);
        }
      });
    };
    getProfile();
    console.log('subscribe get seller profile');
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
      <TLAuthGuard authRequire authRedirect={SELLER_PAGE.SIGN_IN.PATH} seller>
        <TSaleLayout>{children}</TSaleLayout>
      </TLAuthGuard>
    );
};

export default SellerLayout;
