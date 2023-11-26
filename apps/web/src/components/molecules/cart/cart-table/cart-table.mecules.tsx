'use client';
import { cartState } from '@shopizer/stores';
import { Button, Col, InputNumber, Row, Checkbox } from 'antd';
import { useRecoilState } from 'recoil';
import { DeleteOutlined } from '@ant-design/icons';
import { useEffect, useMemo, useState } from 'react';
import { MRowCartTable } from './row-cart-table.molecules';
import { flatten } from 'lodash';


export function MLCartTable(props: { isConfirm: boolean , onSelect?: (selected: string[]) => void}) {
  const [cart, setCart] = useRecoilState(cartState);

  const [cartSelected, setCartSelected] = useState<string[]>([]);

  const allProductValue = useMemo(() => getAllProductValue(), [cart]);

  useEffect(() => {
    console.log('The Cart: ', cart);
    const allProductValue = getAllProductValue();
    const selectedCheck = cartSelected.filter((item: string) => {
      return allProductValue.includes(item);
    });
    if (selectedCheck.length !== cartSelected.length) {
      console.log('re select', selectedCheck);
      setCartSelected(selectedCheck);
    }
  }, [cart]);

  useEffect(() => {
    
    if (props.onSelect) {
      props.onSelect(cartSelected);
    }
  }, [cartSelected]);

  function getSellerProductSelected(sellerId: string) {
    const selected = cartSelected.filter((item: any) => {
      const selectExist = cart?.items?.findIndex((item2: any) => {
        return (
          item2?.seller?.id === sellerId &&
          item2?.cartItems?.findIndex((item3: any) => {
            return (
              item3?.cartVariants?.findIndex(
                (item4: any) => item4?.id === item,
              ) > -1
            );
          }) > -1
        );
      });
      return selectExist > -1;
    });
    return selected;
  }
  function getSellerTotalVariantProduct(sellerId: string) {
    const selected = cart?.items?.find((item: any) => {
      return item?.seller?.id === sellerId;
    });
    const total = selected?.cartItems?.reduce((total: any, item: any) => {
      return total + item?.cartVariants?.length;
    }, 0);
    return total;
  }
  function handleSelectAllSeller(sellerId: string) {
    const selected = getSellerProductSelected(sellerId);
    if (selected.length === getSellerTotalVariantProduct(sellerId)) {
      const newSelected = cartSelected.filter((item: any) => {
        const selectExist = cart?.items?.findIndex((item2: any) => {
          return (
            item2?.seller?.id === sellerId &&
            item2?.cartItems?.findIndex((item3: any) => {
              return (
                item3?.cartVariants?.findIndex(
                  (item4: any) => item4?.id === item,
                ) > -1
              );
            }) > -1
          );
        });
        return selectExist === -1;
      });
      setCartSelected(newSelected);
    } else {
      const newSelected = cartSelected.filter((item: any) => {
        const selectExist = cart?.items?.findIndex((item2: any) => {
          return (
            item2?.seller?.id === sellerId &&
            item2?.cartItems?.findIndex((item3: any) => {
              return (
                item3?.cartVariants?.findIndex(
                  (item4: any) => item4?.id === item,
                ) > -1
              );
            }) > -1
          );
        });
        return selectExist === -1;
      });
      const newSelected2 = [
        ...newSelected,
        ...flatten(
          cart?.items
            ?.find((item: any) => {
              return item?.seller?.id === sellerId;
            })
            ?.cartItems?.map((item: any) => {
              return item?.cartVariants?.map((item2: any) => {
                return item2?.id;
              });
            }),
        ),
      ] as any;
      setCartSelected(newSelected2);
    }
  }
  function getAllProductValue() {
    const allProductValue = cart.items?.map((item: any) => {
      return item?.cartItems?.map((cartItem: any) => {
        return cartItem?.cartVariants?.map((cartVariant: any) => {
          return cartVariant?.id;
        });
      });
    });
    return flatten(flatten(allProductValue));
  }
  function handleSelectAll() {
    const allProductValue = getAllProductValue();
    if (allProductValue.length === cartSelected.length) {
      setCartSelected([]);
    }
    if (allProductValue.length !== cartSelected.length) {
      setCartSelected(allProductValue as string[]);
    }
  }
  function handleClearCart() {
    setCart({ items: [] });
    setCartSelected([]);
  }
  useEffect(() => {
    console.log(cartSelected);
  }, [cartSelected]);
  return (
    <div className="card-product-list">
      <Row className="list-header">
        <Col span="24">
          <div className="grid-table header px-3">
            <span style={{}}>
              <Checkbox
                style={{
                  marginRight: 10,
                  display: props.isConfirm ? 'none' : 'inline-flex',
                }}
                onClick={() => handleSelectAll()}
                checked={allProductValue.length === cartSelected.length}
                indeterminate={
                  allProductValue.length > cartSelected.length &&
                  cartSelected.length > 0
                }
              />
              {!props.isConfirm ? 'Đã chọn' : ''} {cartSelected.length} sản phẩm
            </span>
            <span>Đơn giá</span>
            <span>Số lượng</span>
            <span>Thành tiền</span>
            <span>
              <Button
                hidden={props.isConfirm}
                type="text"
                danger
                onClick={handleClearCart}
                icon={<DeleteOutlined />}
              ></Button>
            </span>
          </div>
        </Col>
      </Row>
      {cart.items?.map((item: any, index: number) => {
        if (props.isConfirm) {
          const allSellerProduct = getSellerProductSelected(item?.seller?.id);
          if (allSellerProduct.length === 0) return null;
        }
        return (
          <Row gutter={[0, 16]} className="list-content" key={index}>
            <Col>
              <span className="d-flex">
                <Checkbox
                  indeterminate={
                    getSellerProductSelected(item?.seller?.id).length > 0 &&
                    getSellerProductSelected(item?.seller?.id).length <
                      getSellerTotalVariantProduct(item?.seller?.id)
                  }
                  onClick={() => handleSelectAllSeller(item?.seller?.id)}
                  checked={
                    getSellerProductSelected(item?.seller?.id).length ===
                    getSellerTotalVariantProduct(item?.seller?.id)
                  }
                  style={{
                    marginRight: 10,
                    display: props.isConfirm ? 'none' : 'inline-flex',
                  }}
                />
                <h6 className="my-0">
                  {item?.seller?.name}{' '}
                  {props.isConfirm
                    ? ''
                    : '(' +
                      getSellerProductSelected(item?.seller?.id).length +
                      '/' +
                      getSellerTotalVariantProduct(item?.seller?.id) +
                      ')'}
                </h6>
              </span>
            </Col>
            <Col span="24">
              {item?.cartItems?.map((cartItem: any, index: number) => {
                return (
                  <MRowCartTable
                    isConfirm={props.isConfirm}
                    cartItem={cartItem}
                    key={index}
                    cartSelected={cartSelected}
                    onSelect={(selected: string[]) => setCartSelected(selected)}
                  />
                );
              })}
            </Col>
          </Row>
        );
      })}
      <style jsx global>{`
        .card-product-list {
          font-weight: 400;
          font-size: 13px;
          color: rgb(36, 36, 36);

          .grid-table {
            display: grid;
            grid-template-columns: auto 100px 100px 120px 32px;
            column-gap: 24px;
            align-items: center;
            padding: 8px 16px;
            border-radius: 4px;

            &:not(.header):hover {
              background-color: #f5f5f5;
              cursor: pointer;
            }
            &.row-table-child {
              grid-template-columns: 60px auto 100px 100px 120px 32px;
            }
            .grid-padding-col {
              border-left: 1px solid #f5f5f5;
            }
          }
          .list-header {
            background: rgb(255, 255, 255);
            padding: 8px 16px;
            border-radius: 4px;
            margin-bottom: 12px;
            position: sticky;
            top: 90px; // TODO dynamic by props if needed
            z-index: 99;

            &::before {
              content: '';
              background: #f5f5f5;
              width: 100%;
              height: 16px;
              position: absolute;
              left: 0px;
              top: -16px;
              right: 0px;
            }
            &::after {
              content: '';
              background: #f5f5f5;
              width: 100%;
              height: 16px;
              position: absolute;
              left: 0px;
              bottom: -16px;
              right: 0px;
            }
          }
          .list-content {
            background-color: #fff;
            margin-top: 16px;
            padding: 16px;
            border-radius: 6px;

            .product-info {
              display: flex;
              align-items: center;
              .product-name {
                margin-left: 16px;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
              }
            }
          }
        }
      `}</style>
    </div>
  );
}
