'use client';

import { cartState } from '@shopizer/stores';
import { Button, Result, Row, Col, Steps, InputNumber, Affix } from 'antd';
import { useRecoilState } from 'recoil';
import {
  CheckSquareOutlined,
  SmileOutlined,
  SolutionOutlined,
  PayCircleOutlined,
} from '@ant-design/icons';
import Image from 'next/image';
import { useState } from 'react';
import { MLCartTable } from '@shopizer/molecules';

export default function CartPage() {
  const [cart, setCart] = useRecoilState(cartState);
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
  const price = 1000000 * (cart?.items[0]?.quantity || 1);
  const setStep = (
    index: number,
    status: 'wait' | 'finish' | 'error' | 'process' = 'wait',
  ) => {
    const newSteps = [...paymentSteps];
    for (let i = 0; i <= index; i++) {
      newSteps[i].status = 'process';
    }
    setPaymentSteps(newSteps);
  };

  return (
    <div>
      {cart?.items?.length > 0 ? (
        <Row className="cart-page" gutter={16}>
          <Col flex="1">
            <Row className="card-steps" style={{ marginBottom: 16 }}>
              <Col span="24">
                <Steps size="small" items={paymentSteps as any} />
              </Col>
            </Row>

            <MLCartTable />
          </Col>
          <Col span="6">
            <Affix offsetTop={16}>
              <div className="sticky-scroll-bar">
                <div className="cart-summary">
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
                      <Button
                        style={{ width: '100%' }}
                        onClick={() => setStep(1)}
                      >
                        Mua Hàng
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Affix>
          </Col>
        </Row>
      ) : (
        <div>
          <Result
            status="404"
            title="Giỏ hàng trống"
            subTitle="Bạn hãy tìm thêm các sản phẩm nhé!"
            extra={[
              <Button key="console" href="/">
                Xem sản phẩm
              </Button>,
            ]}
            style={{
              background: '#fff',
              borderRadius: 6,
            }}
          />
        </div>
      )}

      <style jsx global>{`
        .card-steps {
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
