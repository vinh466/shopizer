'use client';

import { Button, Layout, Menu } from 'antd';
import React, { useEffect, useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { usePathname, useRouter } from 'next/navigation';
import {
  SALES_PAGE,
  SALES_PRODUCT_PAGE,
  SALES_SHOP_PAGE,
} from '@shopizer/constants';

const { Content, Header, Sider } = Layout;

export function TSaleLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const pathName = usePathname();
  return (
    <>
      <Layout style={{ minHeight: '100vh' }} hasSider>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          style={{
            overflow: 'auto',
            height: '100vh',
          }}
        >
          <div
            style={{
              height: '32px',
              margin: '16px',
              background: 'rgba(255,255,255,.2)',
              borderRadius: '6px',
            }}
          />
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[pathName]}
            items={[
              {
                key: SALES_PAGE.DASHBOARD.PATH,
                icon: <UserOutlined />,
                onClick: () => router.push(SALES_PAGE.DASHBOARD.PATH),
                label: 'Dashboard',
              },
              {
                key: 'product',
                icon: <UserOutlined />,
                label: 'Product',
                children: [
                  {
                    key: SALES_PRODUCT_PAGE.LIST.PATH,
                    icon: <UserOutlined />,
                    onClick: () => router.push(SALES_PRODUCT_PAGE.LIST.PATH),
                    label: 'List',
                  },
                  {
                    key: SALES_PRODUCT_PAGE.ADD.PATH,
                    icon: <UserOutlined />,
                    onClick: () => router.push(SALES_PRODUCT_PAGE.ADD.PATH),
                    label: 'Add',
                  },
                ],
              },
              {
                key: 'shop',
                icon: <UserOutlined />,
                label: 'Shop',
                children: [
                  {
                    key: SALES_SHOP_PAGE.PROFILE.PATH,
                    icon: <UserOutlined />,
                    onClick: () => router.push(SALES_SHOP_PAGE.PROFILE.PATH),
                    label: 'Profile',
                  },
                  {
                    key: SALES_SHOP_PAGE.RATING.PATH,
                    icon: <UserOutlined />,
                    onClick: () => router.push(SALES_SHOP_PAGE.RATING.PATH),
                    label: 'Rating',
                  },
                ],
              },
            ]}
          />
        </Sider>
        <Layout>
          {/* <Sider style={siderStyle}>Sider</Sider> */}
          <Header style={{ padding: 0 }}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '16px',
                width: 64,
                height: 64,
              }}
            />
          </Header>
          <Content
            style={{
              padding: 20,
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </>
  );
}
