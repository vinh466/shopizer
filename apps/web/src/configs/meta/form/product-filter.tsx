import { ANumberRangeInput } from '@shopizer/atoms';
import { FormMeta } from '@shopizer/types/commons';
import { Col, Form } from 'antd';

export const getSaleProductTableFilterForm: FormMeta = () => {
  return [
    <Col span={24} key={'stockRange'}>
      <Form.Item name={'stockRange'} label={'Kho hàng'} labelCol={{ span: 4 }}>
        <ANumberRangeInput />
      </Form.Item>
    </Col>,
  ];
};
