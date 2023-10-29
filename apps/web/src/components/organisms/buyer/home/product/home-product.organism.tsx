'use client';

import { Col, Row, Tabs, Typography } from 'antd';
import {
  UserAddOutlined,
  MoneyCollectOutlined,
  GiftOutlined,
} from '@ant-design/icons';
import { OGMySuggestProductList } from './my-suggest-product-list/my-suggest-product-list.organism';
import { useEffect, useState } from 'react';

export function OGHomeProduct() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  return (
    <div className="home-product">
      <div className="home-product-section suggest">
        <Row>
          <Col flex="1">
            <Typography.Title level={5} style={{ marginTop: 0 }}>
              Gợi ý cho bạn
            </Typography.Title>
            <Tabs
              className="suggest-tab"
              defaultActiveKey="1"
              items={[
                {
                  label: (
                    <div className="suggest-tab-item__title">
                      <UserAddOutlined style={{ margin: 0 }} />
                      Dành cho bạn
                    </div>
                  ),
                  key: '1',
                  children: <OGMySuggestProductList loading={loading} />,
                },
                {
                  label: (
                    <div className="suggest-tab-item__title">
                      <GiftOutlined style={{ margin: 0 }} />
                      Khuyên mãi
                    </div>
                  ),
                  key: '2',
                  children: `Tab 1`,
                  disabled: true,
                },
                {
                  label: (
                    <div className="suggest-tab-item__title">
                      <MoneyCollectOutlined style={{ margin: 0 }} />
                      Đấu giá
                    </div>
                  ),
                  key: '3',
                  children: `Tab 1`,
                  disabled: true,
                },
              ]}
            />
          </Col>
        </Row>
      </div>
      <style jsx global>{`
        .home-product {
          & .home-product-section {
            padding: 8px;
            border-radius: 6px;

            &.suggest {
              background-color: #fff;
              .suggest-tab {
                .suggest-tab-item__title {
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  justify-content: center;
                }
              }
            }
          }
        }
      `}</style>
    </div>
  );
}
