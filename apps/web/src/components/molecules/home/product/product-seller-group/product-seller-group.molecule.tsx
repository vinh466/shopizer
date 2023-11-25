import { Button, Card, Col, Rate, Row } from 'antd';
import Image from 'next/image';
import React from 'react';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { MSellerCard, OGProductCard } from '@shopizer/molecules';
import Link from 'next/link';

interface OGProductSellerGroupProps {
  loading?: boolean;
  seller?: any;
}

export function OGProductSellerGroup(props: OGProductSellerGroupProps) {
  const [more, setMore] = React.useState(4);

  const handleShowMore = (reset: boolean = false) => {
    if (reset) setMore(4);
    else setMore(more + 4);
  };
  return (
    <Row gutter={[20, 20]} className="product-seller-group">
      <Col
        span={24}
        style={{
          borderBottom: '1px solid #ddd',
          margin: '10px 0 0',
        }}
      >
        <MSellerCard seller={props.seller} />
      </Col>
      {props.seller.products?.slice(0, more).map((product: any, index: any) => (
        <Col key={index} span="6">
          <Link href={`/product/${product.id}`}>
            <OGProductCard loading={props.loading} product={product} />
          </Link>
        </Col>
      ))}
      <Col span={24} className="text-center">
        {/* {more > 4 && (
          <Button onClick={()=>handleShowMore(true)} icon={<UpOutlined />}>
            Thu gọn
          </Button>
        )} */}
        {more < props.seller.products?.length && (
          <Button onClick={()=>handleShowMore()} icon={<DownOutlined />}>
            Xem thêm
          </Button>
        )}
      </Col>
      <style jsx global>{``}</style>
    </Row>
  );
}
