'use client';

import { useState } from 'react';
import {
  Button,
  Col,
  Drawer,
  FloatButton,
  Row,
  Space,
  Switch,
  Typography,
} from 'antd';
import {
  CodeOutlined,
  MoreOutlined,
  AlertOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import Link from 'next/link';
import {
  COMMON_PAGE,
  SALES_ORDER_PAGE,
  SALES_PRODUCT_PAGE,
  SALES_SHOP_PAGE,
  USER_PAGE,
} from '@shopizer/constants';
import { useRecoilState } from 'recoil';
import { themeState } from '@shopizer/stores';

export function TDevProvider({ children }: { children: React.ReactNode }) {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [theme, setTheme] = useRecoilState(themeState);
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
          icon={
            theme == 'light' ? (
              <div style={{ position: 'relative' }}>
                <AlertOutlined style={{ opacity: '.5' }} />
                <CloseOutlined
                  style={{ position: 'absolute', top: 0, left: 0 }}
                />
              </div>
            ) : (
              <AlertOutlined />
            )
          }
          onClick={() =>
            setTheme((theme: any) => (theme === 'dark' ? 'light' : 'dark'))
          }
        />
        <FloatButton
          icon={<CodeOutlined />}
          onClick={() => setOpenDrawer((v) => !v)}
        />
      </FloatButton.Group>
      <Drawer
        title={
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            Dev
            <Switch
              checkedChildren="Dark"
              unCheckedChildren="Light"
              checked={theme === 'dark'}
              onClick={() =>
                setTheme((theme: any) => (theme === 'dark' ? 'light' : 'dark'))
              }
            />
          </div>
        }
        placement="bottom"
        onClose={() => setOpenDrawer(false)}
        open={openDrawer}
      >
        <div>
          {Object.entries(routes).map(([key, values], index) => (
            <div key={key}>
              <Typography.Title level={4}>{key}</Typography.Title>
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
