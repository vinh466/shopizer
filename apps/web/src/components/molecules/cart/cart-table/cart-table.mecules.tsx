'use client';
import { cartState } from '@shopizer/stores';
import { Button, Col, InputNumber, Row, Checkbox } from 'antd';
import Image from 'next/image';
import { useRecoilState } from 'recoil';
import { DeleteOutlined } from '@ant-design/icons';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { useState } from 'react';
import Link from 'next/link';

const CheckboxGroup = Checkbox.Group;

const plainOptions = ['Apple', 'Pear', 'Orange'];
const defaultCheckedList = ['Apple', 'Orange'];
export function MLCartTable() {
  const [cart, setCart] = useRecoilState(cartState);
  const [checkedList, setCheckedList] =
    useState<CheckboxValueType[]>(defaultCheckedList);

  const checkAll = plainOptions.length === checkedList.length;
  const indeterminate =
    checkedList.length > 0 && checkedList.length < plainOptions.length;

  const onChange = (list: CheckboxValueType[]) => {
    setCheckedList(list);
  };

  const onCheckAllChange = (e: CheckboxChangeEvent) => {
    setCheckedList(e.target.checked ? plainOptions : []);
  };
  const handleChangeQuantity = (value: number) => {
    setCart({
      ...cart,
      items: [
        {
          ...cart.items[0],
          quantity: value,
        },
      ],
    });
  };
  return (
    <div className="card-product-list">
      <Row className="list-header">
        <Col span="24">
          <div className="grid-table">
            <span>
              <Checkbox
                indeterminate={indeterminate}
                onChange={onCheckAllChange}
                checked={checkAll}
                style={{ marginRight: 10 }}
              />
              Tất cả (2 sản phẩm)
            </span>
            <span>Đơn giá</span>
            <span>Số lượng</span>
            <span>Thành tiền</span>
            <span>
              <Button type="text" danger icon={<DeleteOutlined />}></Button>
            </span>
          </div>
        </Col>
      </Row>
      {[1, 2].map((item, index) => (
        <Row gutter={[0, 16]} className="list-content" key={index}>
          <Col>
            <span>
              <Checkbox
                indeterminate={indeterminate}
                onChange={onCheckAllChange}
                checked={checkAll}
                style={{ marginRight: 10 }}
              />
              Shop name
            </span>
          </Col>
          <Col span="24">
            {Array.from({ length: 1 }, () => cart?.items[0])?.map(
              (item: any, index: number) => (
                <div className="grid-table" key={index}>
                  <div className="product-info">
                    <Checkbox
                      indeterminate={indeterminate}
                      onChange={onCheckAllChange}
                      checked={checkAll}
                      style={{ marginRight: 10 }}
                    />
                    <Image
                      src={item.product.image}
                      alt=""
                      width={80}
                      height={80}
                    />
                    <div className="product-name">
                      <Link
                        href={`/product/${item.product.id}`}
                        title={item.product.name}
                      >
                        {item.product.name}
                      </Link>
                    </div>
                  </div>
                  <div className="product-price">
                    {item.price.toLocaleString('vi-VN', {
                      style: 'currency',
                      currency: 'VND',
                    })}
                  </div>
                  <div className="product-quantity">
                    <InputNumber
                      min={1}
                      max={99}
                      value={item.quantity}
                      onChange={(val) => handleChangeQuantity(val)}
                      style={{ width: '80px' }}
                    />
                  </div>

                  <div className="product-price">
                    {item.price.toLocaleString('vi-VN', {
                      style: 'currency',
                      currency: 'VND',
                    })}
                  </div>
                  <div>
                    <Button
                      type="text"
                      danger
                      icon={<DeleteOutlined />}
                    ></Button>
                  </div>
                </div>
              ),
            )}
          </Col>
        </Row>
      ))}
      <style jsx global>{`
        .card-product-list {
          font-weight: 400;
          font-size: 13px;
          color: rgb(36, 36, 36);

          .grid-table {
            display: grid;
            grid-template-columns: auto 180px 120px 120px 32px;
            column-gap: 24px;
            align-items: center;
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
