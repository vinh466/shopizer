'use client';
import { TContainer } from '@shopizer/templates';
import {
  Badge,
  Button,
  Col,
  Dropdown,
  Input,
  Layout,
  MenuProps,
  Row,
  Space,
} from 'antd';
import { SearchProps } from 'antd/es/input';
import Image from 'next/image';
import React, { useEffect } from 'react';
import { ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useRecoilState } from 'recoil';
import { cartState, sessionState } from '@shopizer/stores';
import { useRouter } from 'next/navigation';
import { COMMON_PAGE } from '@shopizer/constants';

const { Header } = Layout;

const headerStyle: React.CSSProperties = {
  minHeight: 64,
  height: 'fit-content',
  lineHeight: '20px',
  padding: 0, 
};

const { Search } = Input;
export function OGMainLayoutHeader() {
  const [session, updateSession] = useRecoilState(sessionState);
  const [cart, setCart] = useRecoilState(cartState);
  const navigate = useRouter();
  const onSearch: SearchProps['onSearch'] = (value, _e, info) => {
    console.log(info?.source, value);
  };

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: 'Tài khoản',
    },
    {
      key: '5',
      label: <Link href="/seller">Gian hàng</Link>,
    },
    {
      key: '2',
      label: <Link href="/order">Đơn hàng</Link>, 
    },
    {
      key: '4',
      label: 'Đăng xuất',
      onClick: () => {
        updateSession(null);
      },
    },
  ];

  useEffect(() => {
    console.log("Cart Change", cart);
  },[cart])
  return (
    <Header style={headerStyle} className="header">
      <TContainer>
        <Row justify={'space-between'} wrap={false} gutter={40}>
          <Col>
            <Link href="/">
              <Image
                className="logo"
                src="/shopizer-logo@0.5x.png"
                width="180"
                height="30"
                alt="logo"
              />
            </Link>
          </Col>
          <Col flex={1} className="search">
            <Search
              placeholder="tìm kiếm sản phẩm, danh mục..."
              allowClear
              type="text"
              enterButton="Tìm kiếm"
              size="large"
              onSearch={onSearch}
            />
          </Col>
          <Col className="account">
            <Space size="large">
              <Link
                href={
                  session.isAuthenticated
                    ? COMMON_PAGE.CART.PATH
                    : COMMON_PAGE.SIGN_IN.PATH
                }
              >
                <Button
                  type="text"
                  size="large"
                  icon={
                    <Badge size="small" count={cart?.items?.length || 0}>
                      <ShoppingCartOutlined />
                    </Badge>
                  }
                ></Button>
              </Link>
              {session?.isAuthenticated ? (
                <Dropdown
                  menu={{ items }}
                  placement="bottomRight"
                  arrow
                  trigger={['click']}
                >
                  <Button type="text" size="large" icon={<UserOutlined />}>
                    {session?.user?.firstName}
                  </Button>
                </Dropdown>
              ) : (
                <Button
                  type="text"
                  size="large"
                  icon={<UserOutlined />}
                  href="/auth/buyer/sign-in"
                >
                  Đăng nhập
                </Button>
              )}
            </Space>
          </Col>
        </Row>
      </TContainer>

      <style jsx global>{`
        .header {
          .logo {
            margin: 26px 0;
          }
          .search {
            display: flex;
            align-items: center;
          }
          .account {
            display: flex;
            align-items: center;
          }
        }
      `}</style>
    </Header>
  );
}
