import {
  Button,
  Col,
  Form,
  FormInstance,
  Input,
  InputNumber,
  Row,
  Space,
} from 'antd';
import {
  MinusCircleOutlined,
  PlusOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { isEqual, without } from 'lodash';
import { MProductVariationRowTableDebounce } from './widgets/product-variation-row-table.molecule';

interface SellDetailProductFormProps {
  formControl: FormInstance;
  isEdit?: boolean;
}

export function SellDetailProductForm(props: SellDetailProductFormProps) {
  const [classify, setClassify] = useState(false);
  const tierVariationFieldLimit = 2;
  const optionFieldLimit = 5;

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  }; 
  return (
    <Form
      labelCol={{
        xs: { span: 24 },
        sm: { span: 4 },
      }}
      wrapperCol={{
        xs: { span: 12 },
        sm: { span: 12 },
      }}
      form={props.formControl}
      id="sell-detail-product-common-form"
      onFinish={onFinish}
      initialValues={{}}
      style={{ width: '100%' }}
      scrollToFirstError
    >
      <Row>
        <Col span={4} style={{ textAlign: 'right', paddingRight: 6 }}>
          Phân loại hàng :
        </Col>
        <Col span={20} style={{ margin: '-10px 0' }}>
          <Row style={{ maxWidth: 767 }}>
            <Form.List name="tierVariation" >
              {(tierVariationFields, { add: add1, remove: remove1 }) => {
                return (
                  <>
                    {tierVariationFields.map(({ key, name, ...restField }) => (
                      <Col
                        span={24}
                        key={key}
                        style={{
                          background: '#eee',
                          padding: 10,
                          marginBottom: 10,
                        }}
                      >
                        <Row
                          key={key}
                          style={{
                            display: 'flex',
                          }}
                        >
                          <Col span={24}>
                            <Row>
                              <Col
                                span={4}
                                className="px-2"
                                style={{ textAlign: 'end' }}
                              >
                                Nhóm phân loại:
                              </Col>
                              <Col span={20}>
                                <div
                                  style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    gap: '8px',
                                  }}
                                >
                                  <Form.Item
                                    {...restField}
                                    name={[name, 'name']}
                                    wrapperCol={{ span: 24 }}
                                    style={{ marginBottom: 0 }}
                                    rules={[
                                      {
                                        required: true,
                                        message: 'Không bỏ trống',
                                      },
                                    ]}
                                  >
                                    <Input
                                      disabled={props.isEdit}
                                      placeholder="nhóm, ví dụ: màu sắc, ..."
                                      showCount
                                      maxLength={20}
                                    />
                                  </Form.Item>
                                  <Button
                                    hidden={props.isEdit}
                                    type="text"
                                    onClick={() => {
                                      props.formControl.setFieldValue(
                                        'modelList',
                                        [],
                                      );
                                      remove1(name);
                                    }}
                                    icon={
                                      <CloseOutlined
                                        style={{
                                          color: 'gray',
                                        }}
                                      />
                                    }
                                  ></Button>
                                </div>
                              </Col>
                            </Row>
                          </Col>

                          <Col
                            span={24}
                            style={{
                              paddingTop: '10px',
                            }}
                          >
                            <Row>
                              <Col
                                span={4}
                                className="px-2"
                                style={{ textAlign: 'end' }}
                              >
                                Phân loại hàng:
                              </Col>
                              <Col span={20}>
                                <Row gutter={[8, 8]}>
                                  <Form.List name={[name, 'options']}>
                                    {(
                                      optionFields,
                                      {
                                        add: addOptionField,
                                        remove: removeOptionField,
                                      },
                                    ) => {
                                      const isSingleOption =
                                        optionFields.length === 1;
                                      return (
                                        <>
                                          {optionFields.map(
                                            (
                                              { key, name, ...restField },
                                              index,
                                            ) => (
                                              <Col key={key}>
                                                <div
                                                  style={{
                                                    display: 'flex',
                                                    gap: '16px',
                                                  }}
                                                >
                                                  <div
                                                    style={{
                                                      display: 'flex',
                                                      gap: '8px',
                                                      marginRight: '12px',
                                                      height: 'fit-content',
                                                    }}
                                                  >
                                                    <Form.Item
                                                      {...restField}
                                                      name={[name]}
                                                      labelCol={{ span: 0 }}
                                                      wrapperCol={{ span: 24 }}
                                                      style={{
                                                        marginBottom: 0,
                                                      }}
                                                      rules={[
                                                        {
                                                          required: true,
                                                          message:
                                                            'Không bỏ trống!',
                                                        },
                                                      ]}
                                                    >
                                                      <Input
                                                        disabled={props.isEdit}
                                                        placeholder="ví dụ: xanh, trắng, ..."
                                                        showCount
                                                        maxLength={20}
                                                      />
                                                    </Form.Item>
                                                    <Button
                                                      hidden={props.isEdit}
                                                      disabled={isSingleOption}
                                                      type="text"
                                                      style={{
                                                        margin: 0,
                                                      }}
                                                      onClick={() =>
                                                        !isSingleOption &&
                                                        removeOptionField(name)
                                                      }
                                                      icon={
                                                        <MinusCircleOutlined
                                                          style={{
                                                            color:
                                                              isSingleOption
                                                                ? 'gray'
                                                                : 'red',
                                                          }}
                                                        />
                                                      }
                                                    ></Button>
                                                  </div>
                                                </div>
                                              </Col>
                                            ),
                                          )}
                                          <Col>
                                            <Form.Item
                                              hidden={props.isEdit}
                                              wrapperCol={{ span: 24 }}
                                              style={{ margin: 0 }}
                                            >
                                              <Button
                                                type="dashed"
                                                onClick={() => addOptionField()}
                                                icon={<PlusOutlined />}
                                                disabled={
                                                  optionFields.length >=
                                                    optionFieldLimit ||
                                                  props.isEdit
                                                }
                                                hidden={
                                                  optionFields.length >=
                                                  optionFieldLimit
                                                }
                                              >
                                                {`Phân loại (${optionFields.length}/${optionFieldLimit})`}
                                              </Button>
                                            </Form.Item>
                                          </Col>
                                        </>
                                      );
                                    }}
                                  </Form.List>
                                </Row>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </Col>
                    ))}
                    <Col span={24}>
                      <Form.Item
                        hidden={props.isEdit}
                        wrapperCol={{ span: 8 }}
                        style={{
                          margin: '8px 0 12px',
                        }}
                      >
                        <Button
                          type="dashed"
                          onClick={() => {
                            setClassify(true);
                            props.formControl.setFieldValue('modelList', []);
                            add1({ name: '', options: [null] });
                          }}
                          icon={<PlusOutlined />}
                          disabled={
                            tierVariationFields.length >=
                              tierVariationFieldLimit || props.isEdit
                          }
                          hidden={
                            tierVariationFields.length >=
                            tierVariationFieldLimit
                          }
                        >
                          {`Thêm nhóm phân loại (${tierVariationFields.length}/${tierVariationFieldLimit})`}
                        </Button>
                      </Form.Item>
                    </Col>
                  </>
                );
              }}
            </Form.List>
          </Row>
        </Col>
      </Row>

      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) => {
          return !isEqual(
            prevValues.tierVariation,
            currentValues.tierVariation,
          );
        }}
      >
        {({ getFieldValue }) => {
          console.log('render');
          const tierVariation = getFieldValue('tierVariation');
          const tierVariationHeadTable =
            tierVariation?.map((item: any) => item.name) || [];
          type Temp = Array<{
            name: string;
            subOptions: Temp;
          }>;
          function getRowValue(row: any): Temp {
            const [first, ...restRow] = row || [];
            return first?.options.map((op: string) => {
              return {
                name: op,
                subOptions: getRowValue(restRow),
              };
            });
          }
          const tierVariationBodyTable = getRowValue(tierVariation);
          console.log({ tierVariationBodyTable });

          return tierVariation?.length > 0 ? (
            <Row
              style={{
                marginTop: 20,
              }}
            >
              <Col span={4} style={{ textAlign: 'right', paddingRight: 6 }}>
                Bảng giá :
              </Col>
              <Col>
                <Row
                  wrap={false}
                  gutter={[16, 0]}
                  style={{
                    borderTop: '1px solid #ccc',
                    borderBottom: '1px solid #ccc',
                    margin: 0,
                    textAlign: 'center',
                    fontWeight: 'bold',
                  }}
                >
                  {tierVariationHeadTable.map((item: any, index: number) => (
                    <Col
                      key={'row' + index}
                      style={{
                        padding: 10,
                        width: 180,
                        borderLeft: index === 0 ? '1px solid #ccc' : 'none',
                        borderRight: '1px solid #ccc',
                      }}
                    >
                      <span className="cell-text"> {item}</span>
                    </Col>
                  ))}

                  <Col flex={1} className="px-0">
                    <Row style={{ height: '100%' }}>
                      <Col
                        span={12}
                        style={{
                          padding: 10,
                          borderRight: '1px solid #ccc',
                        }}
                      >
                        Giá
                      </Col>

                      <Col
                        span={12}
                        style={{
                          padding: 10,
                          borderRight: '1px solid #ccc',
                        }}
                      >
                        Số lượng
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Form.List name="modelList">
                  {(
                    optionFields,
                    { add: addOptionField, remove: removeOptionField },
                  ) => (
                    <MProductVariationRowTableDebounce
                      row={tierVariationBodyTable}
                      root
                    />
                  )}
                </Form.List>
              </Col>

              {/* <pre>{JSON.stringify(tierVariationBodyTable, null, 2)}</pre> */}
            </Row>
          ) : (
            <Row
              style={{
                marginTop: 20,
              }}
            >
              <Col span={24}>
                <Form.Item
                  name={'price'}
                  label="Giá"
                  wrapperCol={{ span: 8 }}
                  rules={[
                    {
                      required: true,
                      message: 'Hãy nhập giá!',
                    },
                  ]}
                >
                  <InputNumber
                    min={10000}
                    max={100000000}
                    className="price-input"
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  name={'stock'}
                  label="Số lượng kho"
                  wrapperCol={{ span: 8 }}
                  rules={[
                    {
                      required: true,
                      message: 'Hãy nhập số lượng!',
                    },
                  ]}
                >
                  <InputNumber min={0} max={1000} />
                </Form.Item>
              </Col>
            </Row>
          );
        }}
      </Form.Item>
    </Form>
  );
}
