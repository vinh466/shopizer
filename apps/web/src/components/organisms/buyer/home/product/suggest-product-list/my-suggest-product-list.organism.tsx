'use client';

import { Card, Col, Rate, Row } from 'antd';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { OGProductCard } from '@shopizer/molecules';
import { productApi } from '@shopizer/apis/product/product';

interface OGMySuggestProductListProps {
  loading?: boolean;
}

export function OGMySuggestProductList(props: OGMySuggestProductListProps) { 
  const [loading, setLoading] = useState(true);
  const [sellerGroupProducts, setSellerGroupProducts] = useState<any>([]);
  function getProducts() {
    productApi.getList({ type: 'seller-group' }).then((res) => {
      console.log(res);
      setSellerGroupProducts(res.results || [])
      setLoading(false);
    });
  }
  useEffect(() => {
    getProducts();
  }, []);
  return (
    <div>
      <Row gutter={[20, 20]} className="product-card">
        {sellerGroupProducts?.[0]?.products?.map((product: any, index: any) => (
          <Col key={index} span="6">
            <Link href={`/product/${product.id}`}>
              <OGProductCard loading={props.loading} product={product} />
            </Link>
          </Col>
        ))}
      </Row>

      <style jsx global>{``}</style>
    </div>
  );
}
