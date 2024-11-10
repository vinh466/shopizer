'use client';

import { productApi } from '@shopizer/apis/product/product';
import { MCartCard, MProductDetail, OGProductCard } from '@shopizer/molecules';
import { Affix, Button, Col, Row } from 'antd';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ProductDetailPage() {
  const { productId } = useParams() as { productId: string };
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<any>(null);
  const [basePrice, setBasePrice] = useState<any>(null);
  const [isOutOfStock, setIsOutOfStock] = useState<any>(false);

  useEffect(()=>{
    productApi.getProduct(productId).then((res)=>{
      console.log(res);
      const isOutOfStock = res.ProductVariant?.every((item:any)=> item.stock === 0)
      setIsOutOfStock(isOutOfStock)
      setProduct(res)
    }).finally(()=>{
      setLoading(false)
    })
  },[])
  return (
    <>
      <Row
        className="product-details-page"
        style={{ width: '100%' }}
        gutter={16}
      >
        <Col span="6">
          <Affix offsetTop={16}>
            <div className="sticky-scroll-bar">
              <OGProductCard gallery product={product} />
            </div>
          </Affix>
        </Col>
        <Col span="12">
          <MProductDetail
            product={product}
            onSelectPrice={(v) => { 
              setBasePrice(v);
            }}
          />
        </Col>
        <Col span="6">
          <Affix offsetTop={16}>
            <div className="sticky-scroll-bar">
              <MCartCard
                product={product}
                basePrice={basePrice}
                isOutOfStock={isOutOfStock}
              />
            </div>
          </Affix>
        </Col>
      </Row>
      <style jsx global>{`
        .product-details-page {
          & > div {
          }
        }
      `}</style>
    </>
  );
}
