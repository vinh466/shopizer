import { Card, Rate } from 'antd';
import Image from 'next/image';
import React from 'react';
import { FrownOutlined, MehOutlined, SmileOutlined } from '@ant-design/icons';
import { BACKEND_PRODUCT_IMAGE_PATH } from '@shopizer/constants';
import ReactImageGallery from 'react-image-gallery';
import { getProductPrice, getProductPriceString } from '@shopizer/utils/data';

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
  product?: any;
}


export function OGProductCard(props: OGProductCardProps) {
  return (
    <div className={'product-card ' + (props.gallery ? ' gallery' : '')}>
      <Card
        hoverable={!props.gallery}
        loading={props.loading}
        cover={
          <div className={`product-card__image `}>
            {props.gallery ? (
              <ReactImageGallery
                items={[
                  {
                    original:
                      BACKEND_PRODUCT_IMAGE_PATH + props?.product?.image,
                    thumbnail:
                      BACKEND_PRODUCT_IMAGE_PATH + props?.product?.image,
                  },
                  ...(props?.product?.imageDesc || []).map((image: string) => ({
                    original: BACKEND_PRODUCT_IMAGE_PATH + image,
                    thumbnail: BACKEND_PRODUCT_IMAGE_PATH + image,
                  })),
                ]}
                infinite
                showNav={false}
                showPlayButton={false}
                showFullscreenButton={false}
              />
            ) : (
              <Image
                loading="lazy"
                alt="example"
                src={BACKEND_PRODUCT_IMAGE_PATH + props?.product?.image}
                width={props.gallery ? '256' : '200'}
                height={props.gallery ? '256' : '200'}
                style={{ objectFit: 'contain' }}
              />
            )}
          </div>
        }
      >
        {!props.gallery && (
          <>
            <h3 className="product-card__desc">{props.product?.name} </h3>
            {/* <Rate
              defaultValue={3}
              disabled
              character={({ index }: any) => customIcons[index + 1]}
              style={{ margin: '4px 0' }}
            /> */}
            <div className="product-card__price">
              <span>
                {getProductPriceString(props.product?.ProductVariant || [])}
              </span>
            </div>
          </>
        )}
        {props.gallery && (
          <div className="p-2">
            <h6>Mô tả</h6>
            <span>{props.product?.description}</span>
          </div>
        )}
      </Card>
      <style jsx global>{`
        .product-card {
          border-radius: 6px;
          border: 1px solid #f0f0f0;
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
            font-weight: 500;
            font-size: 14px;
            line-height: 150%;
            min-height: 36px;
            color: rgb(39, 39, 42);
            margin: 0px;
            word-break: break-word;
          }
          .product-card__price {
            text-align: left;
            font-size: 16px;
            line-height: 150%;
            font-weight: 500;
            // color: rgb(39, 39, 42);
            color: #1890ff;
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
