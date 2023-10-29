'use client';

import { MCartCard, MProductDetail, OGProductCard } from '@shopizer/molecules';
import { Affix, Button, Col, Row } from 'antd';
import { useParams } from 'next/navigation';

export default function ProductDetailPage() {
  const { productId } = useParams() as { productId: string };
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
              <OGProductCard gallery />
            </div>
          </Affix>
        </Col>
        <Col span="12">
          <MProductDetail />
        </Col>
        <Col span="6">
          <Affix offsetTop={16}>
            <div className="sticky-scroll-bar">
              <MCartCard />
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
