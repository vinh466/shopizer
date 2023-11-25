'use client';

import { FC, FormEvent } from 'react';
import { Form, Input, Button, Checkbox, Card, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { COMMON_PAGE, SELLER_PAGE } from '@shopizer/constants';
import { SignInFormValues } from '@shopizer/types/form';
import Image from 'next/image';
const { Title } = Typography;

interface MSignInFormProps {
  onFinish?: (values: SignInFormValues) => void;
  errorMessage?: string;
  loading?: boolean;
  userType: string;
}

export function MSignInForm(props: MSignInFormProps) {
  const onFinish = (values: SignInFormValues) => {
    props.onFinish?.(values);
  };
  return (
    <Card style={{ width: 500, marginBottom: 20 }}>
      <div
        style={{ display: 'flex', justifyContent: 'center', margin: '40px 0' }}
      >
        <Link href="/">
          <Image
            loading="eager"
            src="/shopizer-logo.png"
            width={300}
            height={50}
            alt="logo"
          />
        </Link>
      </div>
      <div style={{ display: 'flex', justifyContent: 'start' }}>
        <Title level={2}>Đăng nhập </Title>
      </div>
      <Form
        name="sign-in-form"
        className="sign-in-form"
        // initialValues={{ remember: true }}
        onFinish={onFinish}
        disabled={props.loading}
      >
        <Form.Item
          name="email"
          rules={[{ required: true, message: 'Hãy điền email!' }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email"
            autoComplete="email"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Hãy điền mật khẩu!' }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Mật khẩu"
            autoComplete="password"
          />
        </Form.Item>
        {/* <a
            style={{ float: 'right' }}
            className="login-form-forgot"
            href=""
            onClick={handleForgotPassword}
          >
            Forgot password
          </a> */}
        {/* <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item> */}
        <div style={{ display: 'flex', justifyContent: 'start' }}>
          {props.errorMessage && (
            <p style={{ color: 'red', margin: 0 }}>{props.errorMessage}</p>
          )}
        </div>
        <Form.Item style={{ marginTop: 8 }}>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            block
            loading={props.loading}
          >
            Đăng nhập
          </Button>
        </Form.Item>
        Bạn chưa có tài khoản?
        <Link
          href={
            props.userType === 'seller'
            ? SELLER_PAGE.SIGN_UP.PATH
            : COMMON_PAGE.SIGN_UP.PATH
          }
        >
          Đăng ký
        </Link>
      </Form>
    </Card>
  );
}
