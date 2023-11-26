'use client';

import { Button, Dropdown, Layout, Menu, MenuProps } from 'antd';
import React, { Suspense, useEffect, useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { usePathname, useRouter } from 'next/navigation';
import {
  SELLER_PAGE,
  SELLER_SHOP_PAGE,
} from '@shopizer/constants';
import Image from 'next/image';
import Link from 'next/link';
import { useRecoilState } from 'recoil';
import { sessionState } from '@shopizer/stores';
import { adminSessionState } from 'src/stores/admin-session.store';

const { Content, Header, Sider } = Layout;

export function TAdminLayout({ children }: { children: React.ReactNode }) {
  const [session, updateSession] = useRecoilState(sessionState);
  const [adminSession, updateAdminSession] = useRecoilState(adminSessionState);
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const pathName = usePathname();

  const items: MenuProps['items'] = [
    {
      key: '4',
      label: 'Đăng xuất',
      onClick: () => {
        updateSession(null);
      },
    },
  ];
  return (
    <>
      <Layout style={{ minHeight: '100vh', minWidth: '1200px' }} hasSider>
        <Sider
          trigger={null}
          collapsible
          width={280}
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
                key: SELLER_PAGE.DASHBOARD.PATH,
                icon: <UserOutlined />, 
                label: 'Quản lý người bán',
                children: [
                  {
                    key: SELLER_SHOP_PAGE.PROFILE.PATH,
                    icon: <UserOutlined />,
                    onClick: () => router.push(SELLER_SHOP_PAGE.PROFILE.PATH),
                    label: 'Duyệt người bán',
                  },
                  {
                    key: SELLER_SHOP_PAGE.RATING.PATH,
                    icon: <UserOutlined />,
                    onClick: () => router.push(SELLER_SHOP_PAGE.RATING.PATH),
                    label: 'Khóa người bán',
                  },
                ],
              },
            ]}
          />
        </Sider>
        <Layout>
          {/* <Sider style={siderStyle}>Sider</Sider> */}
          <Header style={{ padding: 0 }}>
            <div
              className="d-flex justify-content-between align-items-center "
              style={{
                marginRight: 20,
              }}
            >
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
              {adminSession?.isAuthenticated &&
              adminSession?.admin?.username ? (
                <Dropdown
                  menu={{ items }}
                  placement="bottomRight"
                  arrow
                  trigger={['click']}
                >
                  <Button type="text" size="large" icon={<UserOutlined />}>
                    {adminSession?.admin?.username}
                  </Button>
                </Dropdown>
              ) : (
                <Button
                  type="text"
                  size="large"
                  icon={<UserOutlined />}
                  href="./auth/buyer/sign-in"
                >
                  Tài Khoản
                </Button>
              )}
            </div>
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
