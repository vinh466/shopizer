'use client';
import { Avatar, Button, Col, Row, Segmented, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { UpOutlined, DownOutlined } from '@ant-design/icons';
import {
  MProductCategoryBreadcrumbs,
  MSellerCard,
  OGProductCard,
} from '@shopizer/molecules';
import { getProductPrice } from '@shopizer/utils/data';
import { isArray, set } from 'lodash';
import Link from 'next/link';

interface MProductDetailProps {
  product?: any;
  onSelectPrice?: (price: any) => void;
}

export function MProductDetail(props: MProductDetailProps) {
  const [selected, setSelected] = React.useState<number[][]>([]);
  const [relateProductMore, setRelateProductMore] = useState(4);
  const [valueDisplay, setValueDisplay] = useState('Liên hệ');
  const [options, setOptions] = useState<any[]>([]);
  const handleShowRelateProductMore = (reset: boolean = false) => {
    if (reset) setRelateProductMore(4);
    else setRelateProductMore(relateProductMore + 4);
  };
  const handleSelectType = (tier: number, index: number) => {
    console.log(tier, index);
    const newState = [...selected];
    newState[tier] = [index];
    setSelected(newState);
  };
  useEffect(() => {
    if (
        props.product?.ProductVariant?.length > 1 &&
        props.product?.ProductVariant[0]?.variationName !== 'default'
      ) {
        const tierLength =
          props.product?.variationConfig?.tierVariation?.length;
        let modelList = props.product?.variationConfig?.modelList || [];
        if (tierLength === 1) {
          modelList = [modelList];
        }
        const options = props.product?.variationConfig?.tierVariation?.map(
          (item: any, tierIndex: number) => ({
            name: item.name,
            options: item.options.map((option: any, index: number) => {
              const optionsLength = item.options?.length || 0;
              return {
                name: option,
                stock: modelList[tierIndex][index]?.stock || 0,
              };
            }),
          }),
        );
        console.log(options);
        setOptions(options);
      }
  }, [props.product?.ProductVariant]);

  useEffect(() => {
    if (
      props.product?.ProductVariant?.length > 0 &&
      props.product?.ProductVariant[0]?.variationName == 'default'
    ) {
      props.onSelectPrice?.(props.product?.ProductVariant[0]);
    } else if (selected?.length > 0) {
      const tierLength = props.product?.variationConfig?.tierVariation?.length;
      const model = props.product?.variationConfig?.modelList || [];
      if (tierLength === 1) {
        const selectModel = model[selected[0][0]];
        props.onSelectPrice?.(selectModel);
        setValueDisplay(
          selectModel?.price?.toLocaleString('vi-VN', {
            style: 'currency',
            currency: 'VND',
          }),
        );
      } else if (tierLength === 2) {
        const tierSelect1 = selected[0][0];
        const tierSelect2 = selected?.[1]?.[0];

        if (tierSelect2 === undefined) return;
        const selectModel = model[tierSelect1][tierSelect2];
        props.onSelectPrice?.(selectModel);
        setValueDisplay(
          selectModel?.price?.toLocaleString('vi-VN', {
            style: 'currency',
            currency: 'VND',
          }),
        );
      }
      return;
    }
    if (props.product?.ProductVariant?.length > 0) {
      const priceRange = getProductPrice(props.product?.ProductVariant || []);
      if (!priceRange) {
        setValueDisplay('Liên hệ');
        return;
      }
      if (isArray(priceRange) && priceRange.length > 1) {
        if (priceRange[0].price === priceRange[1].price) {
          setValueDisplay(
            priceRange[0].price.toLocaleString('vi-VN', {
              style: 'currency',
              currency: 'VND',
            }),
          );
          return;
        } else
          setValueDisplay(
            priceRange[0].price.toLocaleString('vi-VN', {
              style: 'currency',
              currency: 'VND',
            }) +
              ' - ' +
              priceRange[1].price.toLocaleString('vi-VN', {
                style: 'currency',
                currency: 'VND',
              }),
          );
        return;
      }
      if (!isArray(priceRange))
        setValueDisplay(
          priceRange.price.toLocaleString('vi-VN', {
            style: 'currency',
            currency: 'VND',
          }),
        );
    }
  }, [props.product?.ProductVariant, selected]);

  return (
    <div className="product-detail">
      <div className="product-detail-section">
        <div className="title">
          <h2 className="mb-0">{props.product?.name || 'Tên sản phẩm'}</h2>
        </div>
        <div>
          <MProductCategoryBreadcrumbs category={props.product?.Category} />
        </div>
        <div className="content mt-2">
          <h3 className="price">{valueDisplay}</h3>
          <div className="product-type"></div>
        </div>
      </div>
      <div className="product-detail-section product-type">
        {options?.map((item: any, tierIndex: number) => (
          <div key={tierIndex}>
            <div className="title">
              <h4>{item.name}</h4>
            </div>
            <Space className="mb-3">
              {item?.options?.map((option: any, index: number) => (
                <Button
                  disabled={(!selected[0]?.length && tierIndex !== 0) || !option?.stock}
                  key={index}
                  className={
                    selected?.[tierIndex]?.[0] === index ? 'selected' : ''
                  }
                  onClick={() => handleSelectType(tierIndex, index)}
                >
                  {option?.name}
                </Button>
              ))}
            </Space>
          </div>
        ))}
      </div>
      <div className="product-detail-section seller">
        <div className="title">
          <h4>Thông tin người bán</h4>
        </div>

        <MSellerCard seller={props.product?.Seller} />
      </div>

      <div className="product-detail-section related-products">
        <div className="title">
          <h4>Thông tin chi tiết</h4>
        </div>
        {props.product?.detailList ? (
          <table>
            <tbody>
              {props.product?.detailList.map(
                (item: { title: string; value: string }, index: number) => (
                  <tr key={index}>
                    <td className="px-2" style={{ fontWeight: 600 }}>
                      {item.title}
                    </td>
                    <td className="px-2">{item.value}</td>
                  </tr>
                ),
              )}
            </tbody>
          </table>
        ) : (
          <div>None</div>
        )}
      </div>

      <div className="product-detail-section related-products">
        <div className="title">
          <h4>Sản phẩm tương tự</h4>

          {props.product?.Category?.products.length > 0 ? (
            <Row gutter={[12, 12]}>
              {props.product?.Category?.products
                ?.slice(0, relateProductMore)
                .map((item: any, index: number) => (
                  <Col span={12} key={index}>
                    <Link href={`/product/${item.id}`}>
                      <OGProductCard product={item} />
                    </Link>
                  </Col>
                ))}
              <Col span={24} className="text-center">
                {/* {relateProductMore > 4 && (
                  <Button
                    onClick={() => handleShowRelateProductMore(true)}
                    icon={<UpOutlined />}
                  >
                    Thu gọn
                  </Button>
                )} */}
                {relateProductMore <
                  props.product?.Category?.products?.length && (
                  <Button
                    onClick={() => handleShowRelateProductMore()}
                    icon={<DownOutlined />}
                  >
                    Xem thêm
                  </Button>
                )}
              </Col>
            </Row>
          ) : (
            <div>None</div>
          )}
        </div>
      </div>
      <style jsx global>{`
        .product-detail {
          .product-detail-section {
            background-color: #fff;
            padding: 16px;
            border-radius: 6px;
            margin-bottom: 16px;

            .title {
              color: rgb(39, 39, 42);
              margin: 0px;
              & h2 {
                font-size: 20px;
                font-weight: 500;
                line-height: 150%;
                word-break: break-word;
                white-space: break-spaces;
              }
              & h4 {
                margin: 0 0 8px;
                font-size: 14px;
                font-style: normal;
                font-weight: 600;
                padding-right: 20px;
              }
            }
            .content {
            }
            .price h3 {
              font-size: 24px;
              font-weight: 600;
              line-height: 150%;
            }
            &.seller {
            }
            &.product-type {
              .selected {
                border-color: #1677ff;
                color: #1677ff;
              }
            }
          }
        }
      `}</style>
    </div>
  );
}
