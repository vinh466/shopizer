import { Button, Col, Form, FormInstance, Input, Row, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

interface DetailsAddProductForm {
  formControl?: FormInstance;
}

export function DetailsProductForm(props: DetailsAddProductForm) {
  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };
  const suggestion = {
    title: [
      'V.d: hãng v.v..',
      'V.d: màu sắc v.v..',
      'V.d: kích thước v.v..',
      'V.d: chất liệu v.v..',
      'V.d: cân nặng v.v..',
    ],
    value: [
      ['V.d: apple', 'samsung', 'oppo', 'xiaomi', 'huawei  v.v..'],
      ['V.d: đen', 'trắng', 'xanh', 'đỏ', 'vàng  v.v..'],
      ['V.d: 1', '2', '3', '4', '5  v.v..'],
      ['V.d: nhựa', 'kim loại', 'gỗ', 'giấy', 'vải  v.v..'],
      ['V.d: 1', '2', '3', '4', '5  v.v..'],
    ],
  };
  return (
    <Form
      form={props.formControl}
      id="add-product-details-form"
      onFinish={onFinish}
      autoComplete="off"
    >
      <Row>
        <Col offset={4} span={20}>
          <Form.List name="detailList">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Row key={key}>
                    <Col span={24}>
                      <div className="d-flex gap-3 align-items-center  ">
                        <Button
                          type="text"
                          onClick={() => remove(name)}
                          icon={
                            <MinusCircleOutlined style={{ color: 'red' }} />
                          }
                        />
                        Chi tiêt sản phẩm {name + 1}
                      </div>
                      <Form.Item
                        {...restField}
                        wrapperCol={{ span: 24 }}
                        name={[name, 'title']}
                        rules={[{ required: true, message: 'không bỏ trống!' }]}
                      >
                        <Input placeholder={suggestion.title[name]} />
                      </Form.Item>

                      <Form.Item
                        {...restField}
                        wrapperCol={{ span: 24 }}
                        name={[name, 'value']}
                        rules={[
                          {
                            required: true,
                            message: 'không bỏ trống!',
                          },
                        ]}
                      >
                        <Input.TextArea
                          showCount
                          maxLength={200}
                          rows={2}
                          placeholder={suggestion.value[name]?.join(', ')}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                ))}
                <Form.Item
                  style={{
                    maxWidth: '460px',
                  }}
                >
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    icon={<PlusOutlined />}
                    disabled={fields.length >= 10}
                  >
                    {`Thêm thông tin (${fields.length}/10)`}
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Col>
      </Row>

      <style jsx global>{`
        #add-product-details-form {
          .ant-col.ant-col-20 {
            max-width: 767px;
          }
        }
      `}</style>
    </Form>
  );
}
