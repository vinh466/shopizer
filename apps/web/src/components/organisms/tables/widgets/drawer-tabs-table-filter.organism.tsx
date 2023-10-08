import { Badge, Button, Col, Drawer, Form, Input, Row, Space } from 'antd';
import { useState } from 'react';
import { FilterOutlined } from '@ant-design/icons';
import { FormMeta } from '@shopizer/types/commons';
import { ANumberRangeInput } from '@shopizer/atoms';

interface OGDrawerTableFilterProps {
  formName: string;
  formMeta?: FormMeta;
}

export function OGDrawerTableFilter(props: OGDrawerTableFilterProps) {
  const [form] = Form.useForm();
  const [openDrawer, setOpenDrawer] = useState(false);

  const showDrawer = () => {
    setOpenDrawer(true);
  };

  const onCloseDrawer = () => {
    setOpenDrawer(false);
  };

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };
  return (
    <>
      <Badge dot={false}>
        <Button icon={<FilterOutlined />} onClick={showDrawer} />
      </Badge>
      <Drawer
        title="Drawer with extra actions"
        placement={'right'}
        width={500}
        onClose={onCloseDrawer}
        open={openDrawer}
        extra={
          <Space size="small">
            <Button
              onClick={() => {
                form.resetFields();
              }}
            >
              Clear
            </Button>
            <Button type="primary" htmlType="submit" form={props.formName}>
              Filter
            </Button>
          </Space>
        }
      >
        <Form
          form={form}
          name={props.formName}
          onFinish={onFinish}
          onFinishFailed={(err) => {
            console.log('failed', err);
          }}
          onSubmitCapture={(e) => {
            console.log('submit');
          }}
          layout="horizontal"
          labelAlign="left"
          labelCol={{ span: 4 }}
          labelWrap={true}
        >
          <Row gutter={24}>
            {typeof props.formMeta === 'function'
              ? props.formMeta(form)
              : props.formMeta}
          </Row>
        </Form>
      </Drawer>
    </>
  );
}
