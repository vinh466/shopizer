'use client';

import { MSignInForm, MSignUpForm } from '@shopizer/molecules';
import { sessionState } from '@shopizer/stores';
import { SignInFormValues, SignUpFormValues } from '@shopizer/types/form';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useRecoilState } from 'recoil';

function Page() {
  const { type, page } = useParams();
  const router = useRouter();

  const [session, updateSession] = useRecoilState(sessionState);

  function handleSignIn(values: SignInFormValues) {
    console.log(values);
    updateSession({
      ...session,
      user: {
        ...session?.user,
        firstName: 'Vinh',
        lastName: 'Nguyen',
        email: values.email,
      },
      isAuthenticated: true,
    });
    type === 'buyer' && router.push('/');
    type === 'seller' && router.push('/seller');
  }
  function handleSignUp(values: SignUpFormValues) {
    console.log(values);
    updateSession({
      ...session,
      user: {
        ...session?.user,
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
      },
      isAuthenticated: true,
    });
    type === 'buyer' && router.push('/');
    type === 'seller' && router.push('/seller');
  }
  return (
    <div className="sign-in">
      <div
        style={{
          display: 'flex',
          gap: 40,
          paddingTop: 140,
          flexDirection: 'column',
          justifyContent: 'start',
          alignItems: 'center',
          height: 'calc(100vh - 140px) ',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Link href="/">
            <Image
              loading="eager"
              src="/shopizer-logo.png"
              width={260}
              height={60}
              alt="logo"
            />
          </Link>
        </div>
        {type === 'buyer' && page === 'sign-in' && (
          <MSignInForm onFinish={handleSignIn} />
        )}
        {type === 'buyer' && page === 'sign-up' && (
          <MSignUpForm onFinish={handleSignUp} />
        )}
      </div>
    </div>
  );
}

export default Page;
