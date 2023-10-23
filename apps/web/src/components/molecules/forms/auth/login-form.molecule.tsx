'use client';

import { FC, FormEvent } from 'react';
import { Form, Input, Button, Checkbox, Card, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import Link from 'next/link';
const { Title } = Typography;

interface Values {
  username: string;
  password: string;
  remember: boolean;
}

export const MLoginForm: FC = () => {
  const onFinish = (values: Values) => {
    console.log('Received values of form: ', values);
    if (values.remember) {
      localStorage.setItem('username', values.username);
      localStorage.setItem('password', values.password);
    }
  };

  // const handleForgotPassword = (e: FormEvent) => {
  //   e.preventDefault();
  //   console.log('Handle password recovery logic here');
  // };
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Card style={{ width: 500 }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Title level={2}>Company Logo </Title>
        </div>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your Username!' }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
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
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          <Form.Item style={{ marginTop: 8 }}>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              block
            >
              Log in
            </Button>
          </Form.Item>
          Don&apos;t have an account?
          <Link href="/sign-up">Sign up</Link>
        </Form>
      </Card>
    </div>
  );
};
