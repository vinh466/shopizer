import { Col, Form, Input, InputNumber, Row } from 'antd';
import React from 'react';
import debounceRender from 'react-debounce-render';

// TODO combines recursion and debounce
function MProductVariationRowTable({ row, root }: any) {
  return row?.map((tier_1: any, index_1: number) => (
    <Row
      wrap={false}
      key={'col' + index_1}
      gutter={[16, 0]}
      style={{
        borderBottom:
          index_1 + 1 < row.length || root ? '1px solid #ccc' : 'none',
        margin: 0,
      }}
    >
      <Col
        style={{
          padding: 10,
          width: 180,
          textAlign: 'center',
          borderRight: '1px solid #ccc',
          borderLeft: root ? '1px solid #ccc' : 'none',
        }}
      >
        <span className="cell-text">{tier_1?.name}</span>
      </Col>
      {tier_1?.subOptions?.length > 0 ? (
        <Col style={{ padding: 0 }}>
          {/* <RenderRow row={tier.subOptions} /> // Todo This has bad performance  */}
          <Form.List name={index_1}>
            {(
              optionFields,
              { add: addOptionField, remove: removeOptionField },
            ) =>
              tier_1.subOptions?.map((tier_2: any, index_2: number) => (
                <Row
                  wrap={false}
                  key={'col' + index_1 + 'col-nested' + index_2}
                  gutter={[16, 0]}
                  style={{
                    borderBottom:
                      index_2 < tier_1.subOptions.length - 2
                        ? '1px solid #ccc'
                        : 'none',
                    margin: 0,
                  }}
                >
                  <Col
                    style={{
                      padding: 10,
                      width: 180,
                      textAlign: 'center',
                      borderRight: '1px solid #ccc',
                    }}
                  >
                    <span className="cell-text">{tier_2?.name}</span>
                  </Col>
                  <Row
                    style={{
                      borderRight: '1px solid #ccc',
                    }}
                  >
                    <Col className="my-2 px-0">
                      <Form.Item name={[index_2, 'id']} noStyle>
                        <Input disabled style={{ display: 'none' }} />
                      </Form.Item>
                      <Form.Item
                        key={'col' + index_1 + 'col-nested' + index_2 + 'price'}
                        name={[index_2, 'price']}
                        wrapperCol={{ span: 24 }}
                        style={{ margin: '0 10px' }}
                        className="price-input"
                        rules={[
                          {
                            required: true,
                            message: 'Hãy nhập giá!',
                          },
                        ]}
                      >
                        <InputNumber min={10000} max={100000000} />
                      </Form.Item>
                    </Col>

                    <Col className="my-2">
                      <Form.Item
                        key={'col' + index_1 + 'col-nested' + index_2 + 'stock'}
                        name={[index_2, 'stock']}
                        wrapperCol={{ span: 24 }}
                        style={{ margin: '0 10px' }}
                        rules={[
                          {
                            required: true,
                            message: 'Hãy nhập sô lượng!',
                          },
                        ]}
                      >
                        <InputNumber min={0} max={1000} />
                      </Form.Item>
                    </Col>
                  </Row>
                </Row>
              ))
            }
          </Form.List>
          <style jsx global>{`
            .cell-text {
              font-size: 14px;
              line-height: 20px;
              color: #333;
              display: inline-block;
              word-break: break-word;
            }
          `}</style>
        </Col>
      ) : (
        <Row
          style={{
            borderRight: '1px solid #ccc',
          }}
        >
          <Col className="my-2 px-0">
            <Form.Item name={[index_1, 'id']} noStyle>
              <Input disabled style={{ display: 'none' }} />
            </Form.Item>
            <Form.Item
              name={[index_1, 'price']}
              wrapperCol={{ span: 24 }}
              style={{ margin: '0 10px' }}
              className="price-input"
              rules={[
                {
                  required: true,
                  message: 'Hãy nhập giá!',
                },
              ]}
            >
              <InputNumber min={10000} max={100000000} />
            </Form.Item>
          </Col>

          <Col className="my-2">
            <Form.Item
              name={[index_1, 'stock']}
              wrapperCol={{ span: 24 }}
              style={{ margin: '0 10px' }}
              rules={[
                {
                  required: true,
                  message: 'Hãy nhập sô lượng!',
                },
              ]}
            >
              <InputNumber min={0} max={1000} />
            </Form.Item>
          </Col>
        </Row>
      )}
    </Row>
  ));
}

export const MProductVariationRowTableDebounce = debounceRender(
  MProductVariationRowTable,
  200,
  {
    trailing: true,
  },
);
