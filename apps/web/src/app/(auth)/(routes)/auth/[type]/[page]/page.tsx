'use client';

import { authApi } from '@shopizer/apis/auth/auth';
import { MAminSignInForm, MSignInForm, MSignUpForm } from '@shopizer/molecules';
import { OGSellerVerify } from '@shopizer/organisms';
import { sessionState } from '@shopizer/stores';
import { SignInFormValues, SignUpFormValues } from '@shopizer/types/form';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { adminSessionState } from 'src/stores/admin-session.store';

function Page() {
  const { type, page } = useParams();
  const router = useRouter();
  const [errorMessages, setErrorMessages] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const [session, updateSession] = useRecoilState(sessionState);
  const [adminSession, updateAdminSession] = useRecoilState(adminSessionState);
  const handleResponse = (res: any) => {
    if (res.errorStatusCode) {
      setErrorMessages(res.message);
      setLoading(false);
      return;
    }
    if (res) {
      if (type === 'admin') {
        updateAdminSession({
          ...res,
          isAuthenticated: true,
        });
      } else {
        updateSession({
          ...res,
          isAuthenticated: true,
        });
      }
      type === 'buyer' && router.push('/');
      type === 'seller' && router.push('/seller');
      type === 'admin' && router.push('/admin');
    }
  };

  const handleAdminSignIn = (values: any) => {
    authApi.adminSignIn(values).then(handleResponse);
  };
  const handleSignIn = (values: SignInFormValues) => {
    setLoading(true);
    setErrorMessages('');
    authApi.signIn(values).then(handleResponse);
  };

  const handleSignUp = (values: SignUpFormValues) => {
    setLoading(true);
    setErrorMessages('');
    authApi.signUp(values).then(handleResponse);
  };

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
        {type == 'admin' && (
          <MAminSignInForm
            onFinish={handleAdminSignIn}
            errorMessage={errorMessages}
            loading={loading}
          />
        )}
        {['buyer', 'seller'].includes(type as string) && page === 'sign-in' && (
          <MSignInForm
            onFinish={handleSignIn}
            errorMessage={errorMessages}
            loading={loading}
            userType={type as string}
          />
        )}
        {['buyer', 'seller'].includes(type as string) && page === 'sign-up' && (
          <MSignUpForm
            onFinish={handleSignUp}
            errorMessage={errorMessages}
            loading={loading}
            userType={type as string}
          />
        )}
      </div>
    </div>
  );
}

export default Page;

const bookingSummaryMockData = {
  totalBooking: {
    label: 'Total Number of Bookings',
    value: 2,
    growth: -80,
  },
  brandBookingSummary: [
    {
      label: 'Automall',
      value: 0,
      growth: -100,
    },
    {
      label: 'BYD',
      value: 1,
      growth: -80,
    },
    {
      label: 'EasyAuto 123',
      value: 1,
      growth: -66.7,
    },
    {
      label: 'Zooper Cars',
      value: 0,
      growth: 0,
    },
    {
      label: 'Test',
      value: 1000,
      growth: 80,
    },
  ],
  stateSummaryChart: {
    labels: ['NSW', 'ACT', 'VIC', 'QLD', 'SA', 'WA', 'TAS', 'NT'],
    datasets: {
      distributionRate: [50, 0, 0, 50, 0, 0, 0, 0],
      numberOfBookings: [1, 0, 0, 1, 0, 0, 0, 0],
    },
  },
};