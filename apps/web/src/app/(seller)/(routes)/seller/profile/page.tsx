'use client';

import { sellerApi } from '@shopizer/apis/seller/seller';
import { PUBSUB_UPDATE_SELLER_PROFILE } from '@shopizer/constants';
import { MSellerVerifyForm } from '@shopizer/molecules';
import { SessionState, sessionState } from '@shopizer/stores';
import { notification } from 'antd';
import { useRecoilState } from 'recoil';

function SellerProfile() {
  const [session, updateSession] = useRecoilState<SessionState>(sessionState);
  const handleVerify = (values: any) => {
    sellerApi.updateProfile(values).then((res) => { 
      if (!res.errorStatusCode) {
        notification.success({ message: 'Cập nhật thành công' });
        PubSub.publish(PUBSUB_UPDATE_SELLER_PROFILE, null);
      }
    });
  };

  return (
    <div className="edit-profile">
      <h3>Chỉnh sửa thông tin</h3>
      <MSellerVerifyForm onFinish={handleVerify} isEdit />
      <style jsx global>{`
        .edit-profile {
          background-color: #fff;
          padding: 40px;
        }
      `}</style>
    </div>
  );
}

export default SellerProfile;
