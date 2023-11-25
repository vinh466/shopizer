'use client';

import { FC, FormEvent } from 'react';
import {
  Form,
  Input,
  Button,
  Checkbox,
  Card,
  Typography,
  Row,
  Col,
} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { COMMON_PAGE, SELLER_PAGE } from '@shopizer/constants';
import { SignUpFormValues } from '@shopizer/types/form';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
const { Title } = Typography;

interface MSignUpFormProps {
  onFinish?: (values: SignUpFormValues) => void;
  errorMessage?: string;
  loading?: boolean;
  userType: string;
}

export function MSignUpForm(props: MSignUpFormProps) {
  const onFinish = (values: SignUpFormValues) => {
    props.onFinish?.(values);
  };
  return (
    <Card style={{ width: 500 }}>
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
        <Title level={2}>Đăng ký </Title>
      </div>
      <Form
        name="sign-up-form"
        className="sign-up-form"
        layout="vertical"
        onFinish={onFinish}
        disabled={props.loading}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="firstName"
              label="Họ"
              rules={[{ required: true, message: 'Hãy điền tên!' }]}
            >
              <Input placeholder="Tên" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="lastName"
              label="Tên"
              rules={[{ required: true, message: 'Hãy điền họ!' }]}
            >
              <Input placeholder="Họ" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, message: 'Hãy điền email!' }]}
        >
          <Input placeholder="Email" autoComplete="email" />
        </Form.Item>
        <Form.Item
          name="password"
          label="Mật khẩu"
          rules={[
            { required: true, message: 'Hãy điền mật khẩu!' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (
                  !value ||
                  new RegExp(
                    '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})',
                  ).test(value)
                ) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error(
                    'Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường và số!',
                  ),
                );
              },
            }),
          ]}
        >
          <Input
            type="password"
            placeholder="Mật khẩu"
            autoComplete="new-password"
          />
        </Form.Item>
        <Form.Item
          name="rePassword"
          label="Xác nhận mật khẩu"
          rules={[
            { required: true, message: 'Hãy điền mật khẩu!' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error(
                    'Xác nhận mật khẩu không khớp với mật khẩu đã nhập!',
                  ),
                );
              },
            }),
          ]}
        >
          <Input
            type="password"
            placeholder="Xác nhận mật khẩu"
            autoComplete="new-password"
          />
        </Form.Item>
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
            Đăng ký
          </Button>
        </Form.Item>
        Bạn đã có tài khoản?
        <Link
          aria-disabled
          href={
            props.userType === 'seller'
              ? SELLER_PAGE.SIGN_IN.PATH
              : COMMON_PAGE.SIGN_IN.PATH
          }
        >
          Đăng nhập
        </Link>
      </Form>
    </Card>
  );
}
