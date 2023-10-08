'use client';

import { Card, Col, Row, Statistic, Table, Tabs, Typography } from 'antd';
import React from 'react';
import OGSummaryStatistic from './widgets/summary-statistic.organism';
import { OGTabsTable } from '@shopizer/organisms';
import { saleDashboardTabTable } from '@shopizer/configs/meta/table';

export function OGDashboard() {
  const summary = [
    {
      title: 'Chờ Xác Nhận',
      value: '0',
    },
    {
      title: 'Chờ Lấy Hàng',
      value: '0',
    },
    {
      title: 'Đã Xử Lý',
      value: '0',
    },
    {
      title: 'Đơn Hủy',
      value: '0',
    },
    {
      title: 'Trả Hàng/Hoàn Tiền Chờ Xử Lý',
      value: '0',
    },
    {
      title: 'Sản Phẩm Bị Tạm Khóa',
      value: '0',
    },
    {
      title: 'Sản Phẩm Hết Hàng',
      value: '0',
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
              <OGSummaryStatistic title={val.title} value={val.value} />
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
