'use client';

import { Avatar, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { BACKEND_SELLER_IMAGE_PATH } from '@shopizer/constants';

interface MSellerCardProps {
  seller: any;
}

export function MSellerCard(props: MSellerCardProps) { 
  return (
    <div className="seller-card">
      <Link
        href={`/seller/${props.seller?.id}`}
        className="d-flex align-items-center gap-2 my-2"
      >
        <div className="avatar">
          <Avatar size={40} src={BACKEND_SELLER_IMAGE_PATH + props.seller?.image} />
        </div>
        <div className="info">
          <h2>{props.seller?.name}</h2>
          {/* <h4>0 Theo dõi</h4> */}
        </div>
      </Link>
      <div className="action">
        {/* <Button icon={<PlusOutlined />}>Theo dõi</Button> */}
      </div>

      <style jsx global>{`
        .seller-card {
          display: flex;
          gap: 16px;
          align-items: center;
          .avatar img {
            object-fit: fill;
          }
          .info {
            flex: 1;

            & h2 {
              margin: 0;
              font-size: 15px;
              font-weight: 500;
              line-height: 1.6;
              color: rgb(36, 36, 36);
            }
            & h4 {
              margin: 0;
              font-size: 14px;
              font-style: normal;
              font-weight: 400;
              line-height: 150%;
            }
          }
        }
      `}</style>
    </div>
  );
}
