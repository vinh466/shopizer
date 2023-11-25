import { BACKEND_PRODUCT_IMAGE_PATH, COMMON_PAGE } from '@shopizer/constants';
import { cartState, sessionState } from '@shopizer/stores';
import { Button, Card, Col, InputNumber, Rate, Row, Space } from 'antd';
import { set } from 'lodash';
import Image from 'next/image';
import Link from 'next/link';
import React, { use, useEffect } from 'react';
import { useRecoilState } from 'recoil';

interface MCartCardProps {
  loading?: boolean;
  product?: any;
  basePrice: any;
}

export function MCartCard(props: MCartCardProps) {
  const [cart, setCart] = useRecoilState(cartState);
  const [session, setSession] = useRecoilState(sessionState);
  const [quantity, setQuantity] = React.useState(1);
  const [productVariant, setProductVariant] = React.useState<any>(null);
  const handleAddToCart = () => {
    const newCart = {
      ...cart,
      items: [...(cart.items || [])],
    };
    const cardItems = [...(cart.items || [])];

    console.log(props.product);
    console.log(cardItems);
    const seller = props.product.Seller;
    const cardItemindex = cardItems.findIndex(
      (item: any) => props.product.seller?.id === seller.id,
    );

    console.log({cardItemindex});


    console.log(productVariant, cart);
    newCart.items.push(productVariant);
    console.log(cart);
    console.log(newCart);
    setCart(newCart);
  };
  const onChange = (value: any) => {
    setQuantity(value);
  };
  useEffect(() => {
    console.log(props.basePrice);
    console.log(props.product);
    const productVariant = props.product?.ProductVariant?.find(
      (item: any) => item.id === props.basePrice.id,
    );
    console.log(productVariant);
    setProductVariant(productVariant);
  }, [props.basePrice]);
  return (
    <div className="cart-card">
      <div className="product-type">
        {/* <Image
          loading="lazy"
          alt="example"
          src={BACKEND_PRODUCT_IMAGE_PATH + props.product?.image}
          width={'40'}
          height={'40'}
        /> */}
        <h5>
          {!!productVariant?.variationName
            ? productVariant?.variationName === 'default'
              ? ''
              : productVariant?.variationName
            : 'Hãy chọn Loại'}
        </h5>
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
          {((productVariant?.price || 0) * quantity)?.toLocaleString('vi-VN', {
            style: 'currency',
            currency: 'VND',
          })}
        </div>
      </div>
      <div className="cart-action">
        <div>
          <Link
            href={
              session.isAuthenticated
                ? COMMON_PAGE.CART.PATH
                : COMMON_PAGE.SIGN_IN.PATH
            }
          >
            <Button style={{ width: '100%' }}>Mua Ngay</Button>
          </Link>
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
