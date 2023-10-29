'use client';

import { Button, Layout, Menu } from 'antd';
import React, { Suspense, useEffect, useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { usePathname, useRouter } from 'next/navigation';
import {
  SELLER_PAGE,
  SELLER_PRODUCT_PAGE,
  SELLER_SHOP_PAGE,
} from '@shopizer/constants';
import { TContainer } from '@shopizer/templates';
import Image from 'next/image';
import Link from 'next/link';

const { Content, Header, Sider } = Layout;

export function TSaleLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const pathName = usePathname();
  return (
    <>
      <Layout style={{ minHeight: '100vh', minWidth: '1200px' }} hasSider>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          style={{
            overflow: 'auto',
            minHeight: '100vh',
          }}
        >
          <div
            style={{
              height: '64px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {collapsed ? (
              <Image
                loading="eager"
                src={'/shopizer-logo-icon.png'}
                height={32}
                width={32}
                alt="logo"
              ></Image>
            ) : (
              <Link href="/">
                <Image
                  loading="eager"
                  src={'/shopizer-logo@0.5x.png'}
                  height={28}
                  width={170}
                  alt="logo"
                ></Image>
              </Link>
            )}
          </div>
          <Menu
            mode="inline"
            selectedKeys={[pathName]}
            items={[
              {
                key: SELLER_PAGE.DASHBOARD.PATH,
                icon: <UserOutlined />,
                onClick: () => router.push(SELLER_PAGE.DASHBOARD.PATH),
                label: 'Dashboard',
              },
              {
                key: 'product',
                icon: <UserOutlined />,
                label: 'Product',
                children: [
                  {
                    key: SELLER_PRODUCT_PAGE.LIST.PATH,
                    icon: <UserOutlined />,
                    onClick: () => router.push(SELLER_PRODUCT_PAGE.LIST.PATH),
                    label: 'List',
                  },
                  {
                    key: SELLER_PRODUCT_PAGE.ADD.PATH,
                    icon: <UserOutlined />,
                    onClick: () => router.push(SELLER_PRODUCT_PAGE.ADD.PATH),
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
                    key: SELLER_SHOP_PAGE.PROFILE.PATH,
                    icon: <UserOutlined />,
                    onClick: () => router.push(SELLER_SHOP_PAGE.PROFILE.PATH),
                    label: 'Profile',
                  },
                  {
                    key: SELLER_SHOP_PAGE.RATING.PATH,
                    icon: <UserOutlined />,
                    onClick: () => router.push(SELLER_SHOP_PAGE.RATING.PATH),
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
            {/* Dashboard / Product */}
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
