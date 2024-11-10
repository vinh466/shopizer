'use client';

import { Button, Result, notification } from 'antd';
import { useState } from 'react';
import { MSellerVerifyForm } from '@shopizer/molecules';
import Link from 'next/link';
import Image from 'next/image';
import { sellerApi } from '@shopizer/apis/seller/seller';
import { useRouter } from 'next/navigation';
import { useRecoilState } from 'recoil';
import { SessionState, sessionState } from '@shopizer/stores';
import { COMMON_PAGE } from '@shopizer/constants';

export function OGSellerVerify() {
  const [isRegistered, setIsRegistered] = useState(false);
  const router = useRouter();
  const [errorMessages, setErrorMessages] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [session, updateSession] = useRecoilState<SessionState>(sessionState);

  const isSeller = session?.seller?.status === 'VERIFIED';
  if (isSeller) {
    router.replace('/seller');
  }
  const status = session?.seller?.status;

  const handleVerify = (values: any) => {
    setLoading(true);
    sellerApi.verify(values).then((res: any) => {
      if (res.errorStatusCode) {
        setErrorMessages(res.message);
        setLoading(false);
      } else {
        notification.success({
          message: 'Thành công',
          description:
            'Đăng ký thành công, vui lòng đợi quản trị viên phê duyệt',
        });
        router.replace('/');
      }
    });
  };

  return (
    <div
      style={{
        backgroundColor: 'rgb(255, 255, 255)',
        borderRadius: '6px',
        padding: '0 100px',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 40 }}>
        <Link href="/">
          <Image
            loading="eager"
            src="/shopizer-logo.png"
            width={300}
            height={50}
            alt="logo"
          />
        </Link>
      </div>
      {status === 'PENDING' && (
        <Result
          status="warning"
          title="Đang chờ phê duyệt"
          subTitle="Đăng ký gian hàng của bạn đang được phê duyệt, vui lòng đợi."
          extra={
            <Link href={COMMON_PAGE.HOME.PATH}>
              <Button>Về trang chủ</Button>
            </Link>
          }
        />
      )}
      {status === 'REJECTED' && !isRegistered && (
        <Result
          status="error"
          title="Đăng ký của bạn bị từ chối"
          subTitle="Đăng ký gian hàng của bạn đã bị từ chối, vui lòng liên hệ với quản trị viên để biết thêm thông tin."
          extra={
            <>
              <Link href={COMMON_PAGE.HOME.PATH}>
                <Button>Về trang chủ</Button>
              </Link>
              <Button
                onClick={() => setIsRegistered(true)}
                type="primary"
                loading={loading}
              >
                Đăng ký lại
              </Button>
            </>
          }
        />
      )}
      {status === 'BLOCKED' && (
        <Result
          status="error"
          title="Gian hàng của bạn đã bị khóa"
          subTitle="Gian hàng của bạn đã bị khóa, vui lòng liên hệ với quản trị viên để biết thêm thông tin."
          extra={
            <Link href={COMMON_PAGE.HOME.PATH}>
              <Button>Về trang chủ</Button>
            </Link>
          }
        />
      )}
      {!status && !isRegistered && (
        <Result
          icon={false}
          title="Chào mừng đến Shopizer!"
          subTitle="Để đăng ký bán hàng trên Shopizer, bạn cần cung cấp một số thông tin cơ bản."
          extra={
            <Button
              onClick={() => setIsRegistered(true)}
              type="primary"
              loading={loading}
            >
              Đăng ký
            </Button>
          }
        />
      )}
      {isRegistered && (
        <div>
          <MSellerVerifyForm onFinish={handleVerify} />
        </div>
      )}
    </div>
  );
}
