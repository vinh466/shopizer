import { Card, Rate } from 'antd';
import Image from 'next/image';
import React from 'react';
import { FrownOutlined, MehOutlined, SmileOutlined } from '@ant-design/icons';

const customIcons: Record<number, React.ReactNode> = {
  1: <FrownOutlined />,
  2: <FrownOutlined />,
  3: <MehOutlined />,
  4: <SmileOutlined />,
  5: <SmileOutlined />,
};

interface OGProductCardProps {
  loading?: boolean;
  gallery?: boolean;
}

export function OGProductCard(props: OGProductCardProps) {
  return (
    <div className={'product-card ' + (props.gallery ? ' gallery' : '')}>
      <Card
        hoverable={!props.gallery}
        loading={props.loading}
        cover={
          <div className={`product-card__image `}>
            <Image
              loading="lazy"
              alt="example"
              src="https://salt.tikicdn.com/cache/280x280/ts/product/de/4c/53/dfbb282fbcc1e16a033e3fcc4d99fa32.jpg.webp"
              width={props.gallery ? '256' : '180'}
              height={props.gallery ? '256' : '180'}
            />
          </div>
        }
      >
        {!props.gallery && (
          <>
            <h3 className="product-card__desc">
              Máy tăm nước cầm tay Panasonic công nghệ siêu âm EW1511 - Hàng
              Chính Hãng - Trắng
            </h3>
            <Rate
              defaultValue={3}
              disabled
              character={({ index }: any) => customIcons[index + 1]}
              style={{ margin: '4px 0' }}
            />
            <div className="product-card__price">
              <span>1.000.000đ</span>
            </div>
          </>
        )}
      </Card>
      <style jsx global>{`
        .product-card {
          .ant-card-body {
            padding: 8px;
          }
          .ant-rate {
            font-size: 12px;
            color: #1677ff;
          }
          .product-card__image img {
            object-fit: cover;
            width: 100%;
          }
          &.gallery {
            .ant-card-body {
              padding: 0px;
            }
            .product-card__image {
              padding: 8px;
              & img {
                border-radius: 6px;
                border: 1px solid #f0f0f0;
              }
            }
          }
          .product-card__desc {
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
            white-space: break-spaces;
            font-weight: 400;
            font-size: 12px;
            line-height: 150%;
            color: rgb(39, 39, 42);
            margin: 0px;
            word-break: break-word;
          }
          .product-card__price {
            text-align: left;
            font-size: 16px;
            line-height: 150%;
            font-weight: 500;
            color: rgb(39, 39, 42);
            margin: 0px;
            display: flex;
            -webkit-box-align: center;
            align-items: center;
          }
        }
      `}</style>
    </div>
  );
}
