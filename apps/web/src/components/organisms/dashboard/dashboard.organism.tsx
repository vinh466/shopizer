'use client';

import { Card, Col, Row, Statistic, Table, Tabs, Typography } from 'antd';
import React from 'react';
import OGSummaryStatistic from './widgets/summary-statistic.organism';
import { OGTabsTable } from '@shopizer/organisms';
import { saleDashboardTabTable } from '@shopizer/configs/meta/table';
import { SELLER_ORDER_PAGE, SELLER_PRODUCT_PAGE } from '@shopizer/constants';

export function OGDashboard() {
  const summary = [
    {
      title: 'Chờ Xác Nhận',
      value: '0',
      href: SELLER_ORDER_PAGE.LIST_UNPAID.PATH,
    },
    {
      title: 'Chờ Lấy Hàng',
      value: '0',
      href: SELLER_ORDER_PAGE.LIST_TOSHIP.PATH,
    },
    {
      title: 'Đã Xử Lý',
      value: '0',
      href: SELLER_ORDER_PAGE.LIST_COMPLETED.PATH,
    },
    {
      title: 'Đơn Hủy',
      value: '0',
      href: SELLER_ORDER_PAGE.LIST_CANCELLED.PATH,
    },
    {
      title: 'Trả Hàng/Hoàn Tiền Chờ Xử Lý',
      value: '0',
      href: SELLER_ORDER_PAGE.LIST_RETURN_LIST.PATH,
    },
    {
      title: 'Sản Phẩm Bị Tạm Khóa',
      value: '0',
      href: SELLER_PRODUCT_PAGE.LIST_VIOLATE.PATH,
    },
    {
      title: 'Sản Phẩm Hết Hàng',
      value: '0',
      href: SELLER_PRODUCT_PAGE.LIST_SOLD_OUT.PATH,
    },
  ];

  return (
    <>
      <Card style={{ width: '100%' }} className="sales-dashboard">
        <Typography.Title level={3} style={{ marginTop: 0 }}>
          Danh sách cần làm
        </Typography.Title>
        <Typography.Paragraph>Những việc bạn sẽ phải làm</Typography.Paragraph>
        <Row gutter={16}>
          {summary.map((val, index) => (
            <Col key={index} span={6}>
              <OGSummaryStatistic
                title={val.title}
                value={val.value}
                href={val.href}
              />
            </Col>
          ))}
        </Row>
      </Card>
      <Card
        style={{ width: '100%', marginTop: 20 }}
        className="sales-dashboard"
      >
        <Typography.Title level={3} style={{ marginTop: 0 }}>
          Hiệu Quả Hoạt Động
        </Typography.Title>
        <Typography.Paragraph>
          Bảng Hiệu Quả Hoạt Động giúp Người Bán hiểu rõ hơn về hoạt động buôn
          bán của Shop mình dựa trên những chỉ tiêu sau
        </Typography.Paragraph>
        <OGTabsTable tabs={saleDashboardTabTable} />
      </Card>
    </>
  );
}
