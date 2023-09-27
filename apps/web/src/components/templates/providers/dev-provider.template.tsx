'use client';

import { useState } from 'react';
import { Button, Col, Drawer, FloatButton, Row, Space } from 'antd';
import { CodeOutlined, MoreOutlined } from '@ant-design/icons';
import Link from 'next/link';
import {
  COMMON_PAGE,
  SALES_ORDER_PAGE,
  SALES_PRODUCT_PAGE,
  SALES_SHOP_PAGE,
  USER_PAGE,
} from '@shopizer/constants';

export function TDevProvider({ children }: { children: React.ReactNode }) {
  const [openDrawer, setOpenDrawer] = useState(false);
  const routes = {
    COMMON_PAGE,
    SALES_PRODUCT_PAGE,
    USER_PAGE,
    SALES_ORDER_PAGE,
    SALES_SHOP_PAGE,
  };
  console.log(routes);
  Object.entries(routes).map(([key, values], index) => {
    return;
  });
  return (
    <div className="dev-provider">
      {children}
      <FloatButton.Group style={{ left: 48 }} icon={<MoreOutlined />}>
        <FloatButton
          icon={<CodeOutlined />}
          onClick={() => setOpenDrawer((v) => !v)}
        />
      </FloatButton.Group>
      <Drawer
        title="Dev"
        placement="bottom"
        onClose={() => setOpenDrawer(false)}
        open={openDrawer}
      >
        <div>
          {Object.entries(routes).map(([key, values], index) => (
            <div key={key}>
              <h3>{key}</h3>
              <Space.Compact block>
                {Object.entries(values).map(([key, { PATH, TITLE }], index) => (
                  <Link href={PATH} key={PATH}>
                    <Button type="default">{TITLE}</Button>
                  </Link>
                ))}
              </Space.Compact>
            </div>
          ))}
        </div>
      </Drawer>
    </div>
  );
}
