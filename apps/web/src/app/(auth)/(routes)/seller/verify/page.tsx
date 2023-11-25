'use client';

import { sellerApi } from '@shopizer/apis/seller/seller';
import { ASpinLoadingPage } from '@shopizer/atoms';
import { PUBSUB_UPDATE_SELLER_PROFILE } from '@shopizer/constants';
import { OGSellerVerify } from '@shopizer/organisms';
import { sessionState } from '@shopizer/stores';
import { useLayoutEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

function Page() {
  const [loading, setLoading] = useState(true);
  const [session, updateSession] = useRecoilState<any>(sessionState);

  useLayoutEffect(() => {
    const getProfile = () =>{
      sellerApi.getProfile().then((res: any) => {
        if (res.errorStatusCode) {
        } else {
          updateSession((state: any) => ({
            ...state,
            seller: res.seller,
          }));
          setLoading(false);
        }
      });
    }
    getProfile();
    const sub = PubSub.subscribe(PUBSUB_UPDATE_SELLER_PROFILE, () => {
      getProfile();
    });
    return () => {
      PubSub.unsubscribe(sub);
    }
  }, []);

  if (loading) return <ASpinLoadingPage />;
  else
    return (
      <div className="sign-in">
        <div
          style={{
            display: 'flex',
            gap: 40,
            paddingTop: 40,
            flexDirection: 'column',
            justifyContent: 'start',
            alignItems: 'center',
            height: 'calc(100vh - 140px) ',
          }}
        > 
          <OGSellerVerify />
        </div>
      </div>
    );
}

export default Page;
