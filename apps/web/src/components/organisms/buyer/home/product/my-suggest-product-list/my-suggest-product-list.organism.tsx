'use client';

import { Card, Col, Rate, Row } from 'antd';
import Image from 'next/image';
import React, { useEffect } from 'react';
import Link from 'next/link';
import { OGProductCard } from '@shopizer/molecules';

interface OGMySuggestProductListProps {
  loading?: boolean;
}

export function OGMySuggestProductList(props: OGMySuggestProductListProps) {
  useEffect(() => {
    console.log('render');
  }, []);
  return (
    <div>
      <Row gutter={[20, 20]} className="product-card">
        {Array.from({ length: 23 }).map((_, index) => (
          <Col key={index} span="6">
            <Link href={`/product/${index}`}>
              <OGProductCard loading={props.loading} />
            </Link>
          </Col>
        ))}
      </Row>

      <style jsx global>{``}</style>
    </div>
  );
}
