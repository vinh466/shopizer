import { BACKEND_PRODUCT_IMAGE_PATH, COMMON_PAGE } from '@shopizer/constants';
import { cartState, sessionState } from '@shopizer/stores';
import { Button, InputNumber, notification } from 'antd';
import { cloneDeep, set } from 'lodash';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { use, useEffect } from 'react';
import { useRecoilState } from 'recoil';

interface MCartCardProps {
  loading?: boolean;
  product?: any;
  basePrice: any;
  isOutOfStock?: boolean;
}

export function MCartCard(props: MCartCardProps) {
  const router = useRouter();
  const [cart, setCart] = useRecoilState(cartState);
  const [session, setSession] = useRecoilState(sessionState);
  const [quantity, setQuantity] = React.useState(1);
  const [productVariant, setProductVariant] = React.useState<any>(null);
  const handleAddToCart = (goToCart?: boolean) => {
    if (!productVariant) {
      notification.error({
        message: 'Vui lòng chọn loại sản phẩm',
      });
      return;
    }

    const items = cloneDeep(cart?.items || []);

    const seller = props.product.Seller;
    const cardItemindex = items.findIndex(
      (item: any) => props.product?.Seller?.id === item?.seller?.id,
    );
    if (cardItemindex == -1) {
      items.push({
        seller: seller,
        cartItems: [{ ...props.product, cartVariants: [productVariant] }],
      });
      setCart({ ...cart, items: items });
      notification.success({
        message: 'Đã thêm sản phẩm vào giỏ hàng',
      });

      return;
    } else {
      const productIndex = items[cardItemindex].cartItems.findIndex(
        (product: any) => product?.id === productVariant?.productId,
      );
      if (productIndex == -1) {
        items[cardItemindex].cartItems.push({
          ...props.product,
          cartVariants: [{ ...productVariant, quantity }],
        });
        setCart({ ...cart, items: items });
        notification.success({
          message: 'Đã thêm sản phẩm vào giỏ hàng',
        });
        if (goToCart) router.push(COMMON_PAGE.CART.PATH);
        return;
      } else {
        const variantIndex = items[cardItemindex].cartItems[
          productIndex
        ].cartVariants.findIndex(
          (cartVariant: any) => cartVariant?.id === productVariant?.id,
        );
        if (variantIndex == -1) {
          items[cardItemindex].cartItems[productIndex].cartVariants.push({
            ...productVariant,
            quantity,
          });
          setCart({ ...cart, items: items });

          if (goToCart) {
            router.push(COMMON_PAGE.CART.PATH);
            return;
          }
          notification.success({
            message: 'Đã thêm sản phẩm vào giỏ hàng',
          });
          return;
        } else {
          if (goToCart) {
            router.push(COMMON_PAGE.CART.PATH);
            return;
          }
          return notification.warning({
            message: 'Sản phẩm đã có trong giỏ hàng',
          });
        }
      }
    }
  };
  const onChange = (value: any) => {
    setQuantity(value);
  };
  useEffect(() => {
    setQuantity(1);
    console.log('basePrice change', props.basePrice);
    const productVariant = props.product?.ProductVariant?.find(
      (item: any) => item.id === props.basePrice?.id,
    );

    console.log(productVariant);
    setProductVariant(productVariant);
  }, [props.basePrice]);
  return (
    <div className="cart-card">
      {props.isOutOfStock || productVariant?.stock === 0 ? (
        <h4 className="mb-4">Không còn hàng</h4>
      ) : (
        <div>
          <div className="product-type">
            <h5>
              {!!productVariant?.variationName
                ? productVariant?.variationName === 'default'
                  ? ''
                  : 'Loại: ' + productVariant?.variationName
                : 'Hãy chọn Loại'}
            </h5>
          </div>
          <div className="product-amount">
            <div className="title">Số Lượng</div>
            <InputNumber
              disabled={!productVariant?.stock}
              min={1}
              max={productVariant?.stock || 1}
              value={quantity}
              defaultValue={1}
              onChange={onChange}
              style={{ width: '100%' }}
            />
            {productVariant?.stock && (
              <div style={{ textAlign: 'right', margin: '6px 0 10px' }}>
                {productVariant?.stock || 1} sản phẩm có sẵn
              </div>
            )}
          </div>
          <div className="product-price">
            <div className="title">Tạm Tính</div>
            <div>
              {((productVariant?.price || 0) * quantity)?.toLocaleString(
                'vi-VN',
                {
                  style: 'currency',
                  currency: 'VND',
                },
              )}
            </div>
          </div>
        </div>
      )}
      <div className="cart-action">
        <div>
            <Button
              type="primary"
              disabled={props.isOutOfStock || productVariant?.stock == 0}
              style={{ width: '100%' }}
              onClick={() => handleAddToCart(true)}
            >
              Mua Ngay
            </Button>
        </div>
        <div style={{ margin: '8px 0' }}>
          <Button
            type="primary"
            disabled={props.isOutOfStock || productVariant?.stock == 0}
            style={{ width: '100%' }}
            onClick={() => handleAddToCart()}
          >
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
