'use client';

import { cartState, orderState, sessionState } from '@shopizer/stores';
import {
  Button,
  Result,
  Row,
  Col,
  Steps,
  InputNumber,
  Affix,
  notification,
  Form,
} from 'antd';
import { useRecoilState } from 'recoil';
import {
  CheckSquareOutlined,
  SmileOutlined,
  SolutionOutlined,
  PayCircleOutlined,
} from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { MLCartTable } from '@shopizer/molecules';
import Link from 'next/link';
import { COMMON_PAGE } from '@shopizer/constants';
import { MConfirmCartInfo } from 'src/components/molecules/cart/confirm-cart-info/confirm-cart-info.molecule';
import { MCartPayment } from 'src/components/molecules/cart/cart-payment/cart-payment.molecule';
import { buyerApi } from '@shopizer/apis/buyer/buyer';
import { cloneDeep, set } from 'lodash';

export default function CartPage() {
  const [cartSelected, setCartSelected] = useState<string[]>([]);
  const [session, setSession] = useRecoilState(sessionState);
  const [cart, setCart] = useRecoilState(cartState);
  const [verifyForm] = Form.useForm();
  const [order, setOrderState] = useRecoilState(orderState);
  const [paymentSteps, setPaymentSteps] = useState([
    {
      title: 'Xác nhận sản phẩm',
      status: 'process',
      icon: <CheckSquareOutlined />,
    },
    {
      title: 'Xác nhận thông tin',
      status: 'wait',
      icon: <SolutionOutlined />,
    },
    {
      title: 'Thanh toán',
      status: 'wait',
      icon: <PayCircleOutlined />,
    },
    {
      title: 'Hoàn thành',
      status: 'wait',
      icon: <SmileOutlined />,
    },
  ]);
  const [currentStep, setCurrentStep] = useState(0);
  const price = 1000000 * (cart?.items[0]?.quantity || 1);
  const setStep = (
    index: number,
    status: 'wait' | 'finish' | 'error' | 'process' = 'wait',
  ) => {
    const newSteps = paymentSteps.map((item: any) => ({
      ...item,
      status: 'wait',
    }));
    for (let i = 0; i < index; i++) {
      newSteps[i].status = 'finish';
    }
    newSteps[index].status = 'process';
    setPaymentSteps(newSteps);
    setCurrentStep(index);
  };
  function handleChangeOrder() {
    const orderItems = cart.items
      .map((sellerItem: any) => {
        const cartItems = sellerItem?.cartItems
          ?.map((productItem: any) => {
            const cartVariants = productItem.cartVariants.filter(
              (variant: any) => cartSelected.includes(variant.id),
            );
            if (cartVariants.length > 0) {
              return {
                ...productItem,
                cartVariants,
              };
            } else {
              return null;
            }
          })
          .filter((item: any) => item !== null);
        if (cartItems.length > 0) {
          return {
            ...sellerItem,
            cartItems,
          };
        } else {
          return null;
        }
      })
      .filter((item: any) => item !== null);
    setOrderState({
      ...order,
      itemIds: cartSelected,
      orderItems,
      cart,
    });
  }

  function handleConfirmProduct() {
    if (cartSelected.length === 0) {
      notification.error({
        message: 'Vui lòng chọn sản phẩm',
      });
      return;
    } else {
      handleChangeOrder();
      setCurrentStep(currentStep + 1);
      setStep(currentStep + 1);
    }
  }

  function handleVerify() {
    verifyForm.validateFields().then((values) => {
      console.log(session?.user?.id);
      setOrderState({
        ...order,
        buyer: {
          ...order?.buyer,
          ...values,
          userId: session?.user?.id,
        },
      });
      setCurrentStep(currentStep + 1);
      setStep(currentStep + 1);
    });
  }

  function getOrderTotalPrice() {
    console.log(order);
    return order?.orderItems?.reduce((total: number, item: any) => {
      return (
        total +
        item?.cartItems?.reduce((total: number, product: any) => {
          return (
            total +
            product?.cartVariants?.reduce((total: number, variant: any) => {
              console.log(total, variant?.quantity, variant?.price);
              return total + (variant?.quantity || 1) * variant?.price;
            }, 0)
          );
        }, 0)
      );
    }, 0);
  }

  function handlePayment() {
    const { results, ...order2 } = order;
    buyerApi.order(order2).then((res) => {
      if (!res.errorStatusCode) {
        notification.success({
          message: 'Đặt hàng thành công',
        });

        handleRemvoeProductCart(order.itemIds);

        const { buyer } = order;
        setOrderState({
          buyer,
        });
        setCurrentStep(currentStep + 1);
        setStep(currentStep + 1);
      }
    });
  }
  function handleRemvoeProductCart(variantId: string[]) {
    const newCart = cloneDeep(cart);

    newCart.items.forEach((sellerItem: any, cartItemIndex: number) => {
      sellerItem.cartItems.forEach((productItem: any, index: number) => {
        productItem.cartVariants = productItem.cartVariants.filter(
          (variant: any) => !variantId.includes(variant.id),
        );
        if (productItem.cartVariants.length === 0) {
          sellerItem.cartItems[index] = null;
        }
      });
      sellerItem.cartItems = sellerItem.cartItems.filter(
        (item: any) => item !== null,
      );
      if (sellerItem.cartItems.length === 0) {
        newCart.items[cartItemIndex] = null;
      }
    });
    newCart.items = newCart.items.filter((item: any) => item !== null);

    setCart(newCart);
  }
  useEffect(() => {
    console.log('order', order);
  }, [order]);

  useEffect(() => {
    handleChangeOrder();
  }, [cart, cartSelected]);

  return (
    <div>
      {cart?.items?.length > 0 ? (
        <Row className="cart-page" gutter={16}>
          <Col flex="1">
            <Row className="cart-step" style={{ marginBottom: 16 }}>
              <Col span="24">
                <Steps size="small" items={paymentSteps as any} />
              </Col>
            </Row>

            {currentStep === 1 && (
              <Row className="cart-confirm-info" style={{ marginBottom: 16 }}>
                <Col span="24">
                  Xác nhận thông tin
                  <MConfirmCartInfo form={verifyForm} />
                </Col>
              </Row>
            )}
            {(currentStep == 0 || currentStep == 1) && (
              <MLCartTable
                isConfirm={currentStep > 0}
                onSelect={setCartSelected}
              />
            )}
            {currentStep === 2 && (
              <div className="cart-paument-info">
                <MCartPayment />
              </div>
            )}
            {currentStep === 3 && (
              <div className="cart-paument-finished">
                <Result
                  status="success"
                  title="Đã mua thành công!"
                  subTitle="Đơn hàng sẽ nhanh chóng giao đến bạn, vui lòng đợi."
                  extra={[
                    <Link key="order" href={COMMON_PAGE.ORDER.PATH}>
                      <Button key="order" type="primary">
                        Đơn hàng
                      </Button>
                    </Link>,
                    // <Link key="home" href={COMMON_PAGE.HOME.PATH}>
                    <Button key="buy" onClick={() => setStep(0)}>
                      Mua thêm
                    </Button>,
                    // </Link>,
                  ]}
                />
              </div>
            )}
          </Col>
          {currentStep !== 3 && (
            <Col span="6">
              <Affix offsetTop={16}>
                <div className="sticky-scroll-bar">
                  <div className="cart-summary">
                    <div className="product-price">
                      <div className="title">Tạm Tính</div>
                      <div>
                        {(getOrderTotalPrice() || 0)?.toLocaleString('vi-VN', {
                          style: 'currency',
                          currency: 'VND',
                        })}
                      </div>
                    </div>
                    <div className="cart-action">
                      <div>
                        {currentStep === 0 && (
                          <Button
                            type="primary"
                            style={{ width: '100%' }}
                            onClick={() => handleConfirmProduct()}
                          >
                            Xác nhận sản phẩm
                          </Button>
                        )}

                        {currentStep === 1 && (
                          <Button
                            type="primary"
                            style={{ width: '100%' }}
                            htmlType="submit"
                            onClick={() => {
                              handleVerify();
                            }}
                            className="login-form-button"
                          >
                            {'Xác nhận thông tin'}
                          </Button>
                        )}

                        {currentStep === 2 && (
                          <Button
                            type="primary"
                            style={{ width: '100%' }}
                            htmlType="submit"
                            onClick={() => {
                              handlePayment();
                            }}
                            className="login-form-button"
                          >
                            Thanh toán
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Affix>
            </Col>
          )}
        </Row>
      ) : (
        <div>
          <Result
            status="404"
            title="Giỏ hàng trống"
            subTitle="Bạn hãy tìm thêm các sản phẩm nhé!"
            extra={[
              <Link key="home" href={COMMON_PAGE.HOME.PATH}>
                <Button>Xem sản phẩm</Button>
              </Link>,
            ]}
            style={{
              background: '#fff',
              borderRadius: 6,
            }}
          />
        </div>
      )}

      <style jsx global>{`
        .cart-step {
          background-color: #fff;
          padding: 16px;
          border-radius: 6px;
          position: sticky;
          top: 16px;
          z-index: 99;

          &::before {
            content: '';
            background: #f5f5f5;
            width: 100%;
            height: 20px;
            position: absolute;
            left: 0px;
            top: -20px;
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
        .cart-confirm-info {
          background-color: #fff;
          border-radius: 6px;
          padding: 16px;
        }
        .cart-paument-finished,
        .cart-paument-info {
          background-color: #fff;
          border-radius: 6px;
          padding: 16px;
          margin-top: 16px;
        }
        .cart-summary {
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
