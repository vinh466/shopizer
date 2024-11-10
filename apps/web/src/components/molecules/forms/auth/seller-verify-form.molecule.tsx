'use client';

import { SessionState, sessionState } from '@shopizer/stores';
import { Button, Card, Col, Form, Input, Row } from 'antd';
import Title from 'antd/es/skeleton/Title';
import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import MAddressFormItem from '../widgets/address-form-item/select-address-form-item.molecule';
import { AImageFileInput } from '@shopizer/atoms';
import { BACKEND_SELLER_IMAGE_PATH } from '@shopizer/constants';

interface MSellerVerifyFormProps {
  onFinish?: (values: any) => void;
  errorMessage?: string;
  loading?: boolean;
  isEdit?: boolean;
}
export function MSellerVerifyForm(props: MSellerVerifyFormProps) {
  const [f] = Form.useForm();
  const [session] = useRecoilState<SessionState>(sessionState);
  const onFinish = (values: any) => {
    const { address, ...rest} = values;
    props.onFinish?.({
      id: session?.seller?.id,
      ...rest,
      address : {
        id: session?.seller?.pickupAddress?.[0]?.id,
        ...address
      },
    });
  };
  
  useEffect(() => {
    if (session?.seller) {
      console.log(BACKEND_SELLER_IMAGE_PATH);
      const formValues = {
        image: [
          {
            uid: session?.seller?.image,
            name: session?.seller?.image,
            status: 'done',
            url: BACKEND_SELLER_IMAGE_PATH + session?.seller?.image,
          },
        ],
        shopName: session?.seller?.name,
        email: session?.seller?.email || session?.user?.email,
        phone: session?.seller?.pickupAddress?.[0]?.phone,
        address: {
          province: session?.seller?.pickupAddress?.[0]?.provinceCode,
          district: session?.seller?.pickupAddress?.[0]?.districtCode,
          ward: session?.seller?.pickupAddress?.[0]?.wardCode,
          detail: session?.seller?.pickupAddress?.[0]?.detail,
        },
      };
      f.setFieldsValue(formValues);
    }
  }, [session?.seller, session?.user]);
  return (
    <Form
      style={{ minWidth: 700, padding: '30px 0px' }}
      name="seller-verify-form"
      className="seller-verify-form"
      onFinish={onFinish}
      form={f}
      disabled={props.loading}
      wrapperCol={{ span: 20 }}
      labelCol={{ span: 4 }}
      initialValues={{
        shopName: session?.user?.shopName,
        email: session?.user?.email,
        phone: session?.user?.phone,
        address: session?.user?.address,
      }}
    >
      {props.isEdit && <Form.Item
        name="image"
        label="Avatar shop" 
      >
        <AImageFileInput
          apiEndpoint="/user/seller/image/update"
          count={1}
          name="seller-avatar"
        />
      </Form.Item>}
      <Form.Item
        name="shopName"
        label="Tên Shop"
        rules={[{ required: true, message: 'Không bỏ trống!' }]}
      >
        <Input placeholder="tên shop" autoComplete="shopName" />
      </Form.Item>
      <Form.Item
        name="email"
        label="Email"
        rules={[{ required: true, message: 'Không bỏ trống!' }]}
      >
        <Input
          placeholder="Email"
          autoComplete="email"
          disabled={session?.user?.email}
        />
      </Form.Item>
      <Form.Item
        name="phone"
        label="Số điện thoại"
        rules={[
          { required: true, message: 'Không bỏ trống!' },
          {
            pattern: new RegExp('^(0|\\+84|84)[1-9][0-9]{8}$'),
            message: 'Số điện thoại không hợp lệ!',
          },
        ]}
      >
        <Input placeholder="Số điện thoại" autoComplete="phone" />
      </Form.Item>
      <Form.Item label="Địa chỉ lấy hàng">
        <MAddressFormItem form={f} isEdit={props.isEdit} />
      </Form.Item>

      <div style={{ display: 'flex', justifyContent: 'start' }}>
        {props.errorMessage && (
          <p style={{ color: 'red', margin: 0 }}>{props.errorMessage}</p>
        )}
      </div>
      <div className="d-flex justify-content-end">
        <Button
          type="primary"
          htmlType="submit"
          className="login-form-button"
          loading={props.loading}
        >
          {props.isEdit ? 'Lưu' : 'Hoàn tất'}
        </Button>
      </div>
    </Form>
  );
}
