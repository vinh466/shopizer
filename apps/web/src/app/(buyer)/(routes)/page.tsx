'use client';

import { OGHomeCategory, OGHomeProduct } from '@shopizer/organisms';
import { Affix, Col, Row } from 'antd';

export default function UserPage() {
  return (
    <>
      <Row gutter={16}>
        {/* <Col span="4">
          <Affix offsetTop={16}>
            <div className="sticky-scroll-bar">
              <OGHomeCategory />
            </div>
          </Affix>
        </Col> */}
        <Col flex="1">
          <OGHomeProduct />
        </Col>
      </Row>
    </>
  );
}
