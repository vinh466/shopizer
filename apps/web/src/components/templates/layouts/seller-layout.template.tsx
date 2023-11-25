'use client';

import { Avatar, Button, Dropdown, Layout, Menu, MenuProps } from 'antd';
import React, { Suspense, useEffect, useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { usePathname, useRouter } from 'next/navigation';
import {
  BACKEND_SELLER_IMAGE_PATH,
  SELLER_PAGE,
  SELLER_PRODUCT_PAGE,
  SELLER_SHOP_PAGE,
} from '@shopizer/constants';
import Image from 'next/image';
import Link from 'next/link';
import { useRecoilState } from 'recoil';
import { sessionState } from '@shopizer/stores';

const { Content, Header, Sider } = Layout;

export function TSaleLayout({ children }: { children: React.ReactNode }) {
  const [session, updateSession] = useRecoilState(sessionState);
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const pathName = usePathname();

  const items: MenuProps['items'] = [
    {
      key: '5',
      label: 'Tài khoản',
      onClick: () => {
        router.push('/seller/profile');
      },
    },
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
                  // {
                  //   key: SELLER_SHOP_PAGE.RATING.PATH,
                  //   icon: <UserOutlined />,
                  //   onClick: () => router.push(SELLER_SHOP_PAGE.RATING.PATH),
                  //   label: 'Rating',
                  // },
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
              {session?.isAuthenticated && session?.seller?.name ? (
                <Dropdown
                  menu={{ items }}
                  placement="bottomRight"
                  arrow
                  trigger={['click']}
                >
                  <div className="d-flex align-items-center pointer">
                    <Button
                      type="text"
                      size="large"
                      className='d-flex align-items-center'
                      icon={
                        <Avatar
                          size={30}
                          icon={
                            session?.seller?.image ? (
                              <Image
                                src={
                                  BACKEND_SELLER_IMAGE_PATH +
                                  session?.seller?.image
                                }
                                alt="avatar"
                                width={30}
                                height={30}
                              />
                            ) : (
                              <UserOutlined />
                            )
                          }
                        />
                      }
                    >
                      <span style={{lineHeight: 30}}>{session?.seller?.name}</span>
                    </Button>
                  </div>
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
