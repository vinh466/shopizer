import { BACKEND_PRODUCT_IMAGE_PATH } from '@shopizer/constants';
import { Button, Checkbox, InputNumber } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { DeleteOutlined } from '@ant-design/icons';
import { use, useEffect, useMemo, useState } from 'react';
import { useRecoilState } from 'recoil';
import { cartState } from '@shopizer/stores';
import { cloneDeep, debounce, set } from 'lodash';

interface MRowCartTableProps {
  cartItem: any;
  cartSelected: string[];
  onSelect?: (id: string[]) => void;
  isConfirm?: boolean;
}

export function MRowCartTable(props: MRowCartTableProps) {
  const [cart, setCart] = useRecoilState(cartState);
  const cartVariants = props.cartItem?.cartVariants;
  if (!cartVariants || cartVariants.length === 0) return null;
  const selected = useMemo(
    () => getProductSelected(),
    [props.cartSelected, props.cartItem],
  );

  const handleSelect = (
    id: string,
    checkAll = false,
    singleVariant = false,
  ) => {
    if (props.isConfirm) return;
    if (checkAll) {
      if (selected.length === cartVariants.length) {
        props.onSelect?.(
          props.cartSelected.filter(
            (item) => !selected.map((i: any) => i.id).includes(item),
          ),
        );
      } else {
        props.onSelect?.([
          ...props.cartSelected,
          ...cartVariants.map((item: any) => item?.id),
        ]);
      }
      return;
    } else {
      const index = props.cartSelected.findIndex((item) => item === id);
      if (index === -1) {
        props.onSelect?.([...props.cartSelected, id]);
      } else {
        const newSelected = [...props.cartSelected];
        newSelected.splice(index, 1);
        props.onSelect?.(newSelected);
      }
    }
  };
  
  function handleRowClick(id: string) {
    handleSelect(id);
  }
  function getProductSelected() {
    const selected = cartVariants.filter((item: any) =>
      props.cartSelected.includes(item?.id || ''),
    );
    return selected;
  }
  function handleRemvoeProductCart(variantId: string, removeProduct = false) {
    console.log('handleRemvoeProductCart', variantId, removeProduct);
    const sellerId = props.cartItem?.sellerId;

    const newCart = cloneDeep(cart);
    const sellerIndex = newCart?.items?.findIndex(
      (item: any) => item?.seller?.id === sellerId,
    );
    console.log({ sellerIndex });
    if (sellerIndex !== -1) {
      const productIndex = newCart?.items[sellerIndex]?.cartItems?.findIndex(
        (item: any) => item?.id === props.cartItem?.id,
      );
      console.log({ productIndex });
      if (productIndex !== -1) {
        if (removeProduct) {
          // remove product
          newCart?.items[sellerIndex]?.cartItems?.splice(productIndex, 1);
        } else {
          // remove product variant
          const variantIndex = newCart?.items[sellerIndex]?.cartItems[
            productIndex
          ]?.cartVariants?.findIndex((item: any) => item?.id === variantId);
          if (variantIndex !== -1) {
            newCart?.items[sellerIndex]?.cartItems[
              productIndex
            ]?.cartVariants?.splice(variantIndex, 1);
          }
        }
      }

      if (newCart?.items[sellerIndex]?.cartItems?.length === 0) {
        newCart?.items?.splice(sellerIndex, 1);
      } else {
        if (
          newCart?.items[sellerIndex]?.cartItems[productIndex]?.cartVariants
            ?.length === 0
        ) {
          newCart?.items[sellerIndex]?.cartItems?.splice(productIndex, 1);
        }
      }
      setCart(newCart);
    }
  }
  function handleChangeQuantity(variantId: string, value: any) {
    const sellerId = props.cartItem?.sellerId;
    const newCart = cloneDeep(cart);
    const sellerIndex = newCart?.items?.findIndex(
      (item: any) => item?.seller?.id === sellerId,
    );
    if (sellerIndex !== -1) {
      const productIndex = newCart?.items[sellerIndex]?.cartItems?.findIndex(
        (item: any) => item?.id === props.cartItem?.id,
      );
      if (productIndex !== -1) {
        const variantIndex = newCart?.items[sellerIndex]?.cartItems[
          productIndex
        ]?.cartVariants?.findIndex((item: any) => item?.id === variantId);
        if (variantIndex !== -1) {
          set(newCart?.items[sellerIndex]?.cartItems[productIndex]?.cartVariants[variantIndex], 'quantity', value);

          console.log(
            newCart?.items[sellerIndex]?.cartItems[productIndex]?.cartVariants[
              variantIndex
            ],
          );
        }
      }
      console.log(newCart);
      setCart(newCart);
    }
  }

  if (cartVariants.length > 0 && cartVariants[0].variationName === 'default') {
    return !(props.isConfirm && getProductSelected().length === 0) ? (
      <div
        className={'grid-table' + (props.isConfirm ? ' header' : '')}
        style={{
          borderTop: '1px solid #ccc',
          paddingTop: 10,
        }}
        onClick={() => handleSelect(cartVariants[0]?.id, true, true)}
      >
        <div className="product-info">
          <Checkbox
            indeterminate={
              selected.length > 0 && selected.length < cartVariants.length
            }
            checked={selected.length === cartVariants.length}
            style={{
              marginRight: 10,
              display: props.isConfirm ? 'none' : 'inline-flex',
            }}
          />
          <Image
            src={BACKEND_PRODUCT_IMAGE_PATH + props.cartItem?.image}
            alt=""
            width={80}
            height={80}
          />
          <div className="product-name">
            <Link
              href={`/product/${props.cartItem?.id}`}
              title={props.cartItem?.name}
              target="_blank"
            >
              {props.cartItem?.name}
            </Link>
          </div>
        </div>
        <div className="product-price">
          {cartVariants[0]?.price?.toLocaleString('vi-VN', {
            style: 'currency',
            currency: 'VND',
          })}
        </div>
        <div className="product-quantity" onClick={(e) => e.stopPropagation()}>
          <InputNumber
            disabled={props.isConfirm}
            min={1}
            max={cartVariants[0]?.stock}
            onChange={(value) =>
              handleChangeQuantity(cartVariants[0]?.id, value)
            }
            defaultValue={cartVariants[0]?.quantity || 1}
            style={{ width: '80px' }}
          />
          <div
            className="stock-helper"
            style={{
              color: '#aaa',
              padding: '0 10px',
              fontSize: 12,
              marginTop: 5,
              display:
                !props.isConfirm && cartVariants[0]?.stock ? 'block' : 'none',
            }}
          >
            {cartVariants[0]?.stock ? `Kho: ${cartVariants[0]?.stock}` : ''}
          </div>
        </div>
        <div className="product-price">
          {cartVariants[0]?.price?.toLocaleString('vi-VN', {
            style: 'currency',
            currency: 'VND',
          })}
        </div>
        <div>
          <Button
            type="text"
            onClick={(e) => {
              e.stopPropagation();
              handleRemvoeProductCart(cartVariants[0]?.id);
            }}
            hidden={props.isConfirm}
            danger
            icon={<DeleteOutlined />}
          ></Button>
        </div>
      </div>
    ) : null;
  }
  // show all variant
  else
    return !(props.isConfirm && getProductSelected().length === 0) ? (
      <div
        style={{
          borderTop: '1px solid #ccc',
          paddingTop: 10,
        }}
      >
        <div
          className={'grid-table' + (props.isConfirm ? ' header' : '')}
          onClick={() => handleSelect('', true)}
        >
          <div className="product-info">
            <Checkbox
              indeterminate={
                selected.length > 0 && selected.length < cartVariants.length
              }
              onClick={(e) => e.stopPropagation()}
              checked={selected.length === cartVariants.length}
              style={{
                marginRight: 10,
                display: props.isConfirm ? 'none' : 'inline-flex',
              }}
            />
            <Image
              src={BACKEND_PRODUCT_IMAGE_PATH + props.cartItem?.image}
              alt=""
              width={80}
              height={80}
            />
            <div className="product-name">
              <Link
                onClick={(e) => e.stopPropagation()}
                href={`/product/${props.cartItem?.id}`}
                title={props.cartItem?.name}
                target="_blank"
              >
                {props.cartItem?.name}
              </Link>
            </div>
          </div>
          <div className="product-price">
            {cartVariants[0]?.price?.toLocaleString('vi-VN', {
              style: 'currency',
              currency: 'VND',
            })}
          </div>
          <div className="product-quantity"></div>
          <div className="product-price">
            {cartVariants[0]?.price?.toLocaleString('vi-VN', {
              style: 'currency',
              currency: 'VND',
            })}
          </div>
          <div>
            <Button
              type="text"
              onClick={(e) => {
                e.stopPropagation();
                handleRemvoeProductCart(cartVariants[0]?.id, true);
              }}
              danger
              hidden={props.isConfirm}
              icon={<DeleteOutlined />}
            ></Button>
          </div>
        </div>
        <div className="grid-table row-table-child header p-0">
          <div className="grid-padding-col"></div>
          <h6>Loại sản phẩm:</h6>
        </div>
        {cartVariants.map((variant: any, index: number) => {
          if (props.isConfirm) {
            if (!props.cartSelected.includes(variant?.id || '')) {
              return null;
            }
          }
          return (
            <div
              className={
                'grid-table row-table-child' +
                (props.isConfirm ? ' header' : '')
              }
              key={index}
              onClick={() => handleRowClick(variant?.id || '')}
            >
              <div className="grid-padding-col"></div>
              <div className="product-info">
                <Checkbox
                  // indeterminate={indeterminate}
                  checked={props.cartSelected.includes(variant?.id || '')}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelect(variant?.id || '');
                  }}
                  style={{
                    marginRight: 10,
                    display: props.isConfirm ? 'none' : 'inline-flex',
                  }}
                />
                <div className="product-type-name">
                  {variant?.variationName}
                </div>
              </div>
              <div className="product-price">
                {variant?.price?.toLocaleString('vi-VN', {
                  style: 'currency',
                  currency: 'VND',
                })}
              </div>
              <div
                className="product-quantity"
                onClick={(e) => e.stopPropagation()}
              >
                <InputNumber
                  disabled={props.isConfirm}
                  min={1}
                  onChange={(value) => handleChangeQuantity(variant?.id, value)}
                  max={variant?.stock || 1}
                  defaultValue={variant?.quantity || 1}
                  style={{ width: '80px' }}
                />
                <div
                  className="stock-helper"
                  style={{
                    color: '#aaa',
                    padding: '0 10px',
                    fontSize: 12,
                    marginTop: 5,
                    display:
                      !props.isConfirm && variant?.stock ? 'block' : 'none',
                  }}
                >
                  {variant?.stock ? `Kho: ${variant?.stock}` : ''}
                </div>
              </div>
              <div className="product-price">
                {variant?.price?.toLocaleString('vi-VN', {
                  style: 'currency',
                  currency: 'VND',
                })}
              </div>
              <div>
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemvoeProductCart(variant?.id || '');
                  }}
                  type="text"
                  danger
                  hidden={props.isConfirm}
                  icon={<DeleteOutlined />}
                ></Button>
              </div>
            </div>
          );
        })}
      </div>
    ) : null;
}
