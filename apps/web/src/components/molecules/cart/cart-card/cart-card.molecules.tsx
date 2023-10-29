import { cartState } from '@shopizer/stores';
import { Button, Card, Col, InputNumber, Rate, Row, Space } from 'antd';
import { set } from 'lodash';
import Image from 'next/image';
import React from 'react';
import { useRecoilState } from 'recoil';

interface MCartCardProps {
  loading?: boolean;
  product?: any;
}

export function MCartCard(props: MCartCardProps) {
  const [cart, setCart] = useRecoilState(cartState);
  const [quantity, setQuantity] = React.useState(1);
  const price = 1000000 * quantity;
  const handleAddToCart = () => {
    setCart({
      ...cart,
      items: [
        {
          id: 1,
          quantity: quantity,
          price: 1000000,
          product: {
            id: 1,
            name: 'Máy tăm nước cầm tay Panasonic công nghệ siêu âm EW1511 - Hàng Chính Hãng - Trắng',
            price: 1000000,
            image:
              'https://salt.tikicdn.com/cache/280x280/ts/product/de/4c/53/dfbb282fbcc1e16a033e3fcc4d99fa32.jpg.webp',
          },
        },
      ],
    });
  };
  const onChange = (value: any) => {
    setQuantity(value);
  };
  return (
    <div className="cart-card">
      <div className="product-type">
        <Image
          loading="lazy"
          alt="example"
          src="https://salt.tikicdn.com/cache/280x280/ts/product/de/4c/53/dfbb282fbcc1e16a033e3fcc4d99fa32.jpg.webp"
          width={'40'}
          height={'40'}
        />
        <span>Màu Đen</span>{' '}
      </div>
      <div className="product-amount">
        <div className="title">Số Lượng</div>
        <InputNumber
          min={1}
          max={99}
          defaultValue={1}
          onChange={onChange}
          style={{ width: '100%' }}
        />
      </div>
      <div className="product-price">
        <div className="title">Tạm Tính</div>
        <div>
          {price?.toLocaleString('vi-VN', {
            style: 'currency',
            currency: 'VND',
          })}
        </div>
      </div>
      <div className="cart-action">
        <div>
          <Button style={{ width: '100%' }} href="/cart">
            Mua Ngay
          </Button>
        </div>
        <div style={{ margin: '8px 0' }}>
          <Button style={{ width: '100%' }} onClick={handleAddToCart}>
            Thêm vào giỏ
          </Button>
        </div>
      </div>
      <style jsx global>{`
        .cart-card {
          background-color: #fff;
          border-radius: 6px;
          padding: 16px;
          box-shadow: 0 0 4px 0 rgb(0 0 0 / 10%);
          .title {
            font-size: 16px;
            font-style: normal;
            font-weight: 600;
            line-height: 150%;
            color: rgb(39, 39, 42);
            margin: 6px 0 8px;
          }
          .product-type {
            display: flex;
            align-items: center;
            & img {
              margin-right: 8px;
            }
          }
          .product-amount {
            .ant-input-number-handler-wrap {
              opacity: 1;
            }
          }
          .product-price {
            font-size: 24px;
            font-style: normal;
            font-weight: 600;
            line-height: 150%;
          }
          .cart-action {
            margin-top: 8px;
          }
        }
      `}</style>
    </div>
  );
}
