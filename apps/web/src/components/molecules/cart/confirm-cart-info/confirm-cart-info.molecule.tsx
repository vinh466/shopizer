import { Form, FormInstance, Input } from 'antd';
import MSelectAddressFormItem from '../../forms/widgets/address-form-item/select-address-form-item.molecule';
import { useRecoilState } from 'recoil';
import { orderState, sessionState } from '@shopizer/stores';
import { useEffect } from 'react';

interface MConfirmCartInfoProps {
  onFinish?: (values: any) => void;
  form: FormInstance;
}

export function MConfirmCartInfo(props: MConfirmCartInfoProps) {
  const [session, setSession] = useRecoilState(sessionState);
  const [order, setOrderState] = useRecoilState(orderState);
  const onFinish = (values: any) => {};
  useEffect(() => {
    if (session?.seller) {
      const formValues = {
        name:
          order?.buyer?.name ||
          session?.user?.lastName + ' ' + session?.user?.firstName,
        email: session?.user?.email,
        phone:
          order?.buyer?.phone ||
          session?.user?.pickupAddress?.[0]?.phone,
        address: {
          province:
            order?.buyer?.address?.province ||
            session?.user?.pickupAddress?.[0]?.provinceCode,
          district:
            order?.buyer?.address?.district ||
            session?.user?.pickupAddress?.[0]?.districtCode,
          ward:
            order?.buyer?.address?.ward ||
            session?.user?.pickupAddress?.[0]?.wardCode,
          detail:
            order?.buyer?.address?.detail ||
            session?.user?.pickupAddress?.[0]?.detail,
        },
      };
      props.form.setFieldsValue(formValues);
    }
  }, [session?.seller]);
  return (
    <Form
      style={{ minWidth: 700, padding: '30px 0px' }}
      name="cart-info-form"
      className="seller-verify-form"
      onFinish={onFinish}
      form={props.form}
      wrapperCol={{ span: 20 }}
      labelCol={{ span: 4 }}
      initialValues={{}}
    >
      <Form.Item
        name="name"
        label="Người nhận hàng"
        rules={[{ required: true, message: 'Không bỏ trống!' }]}
      >
        <Input placeholder="Tên" autoComplete="shopName" />
      </Form.Item>
      <Form.Item
        name="email"
        help="Email để liên khi giao hàng"
        label="Email"
        rules={[{ required: true, message: 'Không bỏ trống!' }]}
        style={{ marginBottom: 30 }}
      >
        <Input placeholder="Email" autoComplete="email" disabled />
      </Form.Item>
      <Form.Item
        name="phone"
        label="Số điện thoại"
        help="Số điện thoại liên hệ khi giao hàng"
        style={{ marginBottom: 30 }}
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
      <Form.Item label="Địa chỉ lấy hàng" required>
        <MSelectAddressFormItem form={props.form} isEdit />
      </Form.Item>
    </Form>
  );
}
