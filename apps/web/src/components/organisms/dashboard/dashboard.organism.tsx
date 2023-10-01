'use client';

import { Card, Col, Row, Statistic, Table, Tabs, Typography } from 'antd';
import React from 'react';
import OGSummaryStatistic from './widgets/summary-statistic.organism';
import { OGTabsTable, TabTable } from '@shopizer/organisms';

const saleOperationalEfficiencyTable = [
  {
    title: 'Tiêu Chí',
    dataIndex: 'criteria',
    width: '50%',
    key: 'criteria',
  },
  {
    title: 'Shop của tôi',
    dataIndex: 'shopValue',
    width: '25%',
    key: 'shopValue',
  },
  {
    title: 'Chỉ tiêu',
    dataIndex: 'targetValue',
    width: '25%',
    key: 'targetValue',
  },
];
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
  const saleViolationData = [
    {
      key: '1',
      criteria: 'Sản phẩm bị khóa/xóa',
      shopValue: 0,
      targetValue: 0,
    },
    {
      key: '2',
      criteria: 'Tỉ lệ hàng đặt trước',
      shopValue: 0 + '%',
      targetValue: '≤10.00%',
    },
    {
      key: '3',
      criteria: 'Các vi phạm khác',
      shopValue: 0,
      targetValue: '0',
    },
  ];
  const orderManagementData = [
    {
      key: '1',
      criteria: 'Tỉ lệ đơn không thành công ',
      shopValue: 0 + '%',
      targetValue: '<10.00%',
    },
    {
      key: '2',
      criteria: 'Tỷ lệ giao hàng trễ',
      shopValue: 0 + '%',
      targetValue: '<10.00%',
    },
    {
      key: '3',
      criteria: 'Thời gian chuẩn bị hàng',
      shopValue: 0,
      targetValue: '<1.50 days',
    },
  ];
  const customerCareData = [
    {
      key: '1',
      criteria: 'Tỉ lệ phản hồi',
      shopValue: 57 + '%',
      targetValue: '≥80.00%',
    },
    {
      key: '2',
      criteria: 'Thời gian phản hồi',
      shopValue: 0,
      targetValue: '<0.50 days',
    },
  ];
  const buyerSatisfactionData = [
    {
      key: '1',
      criteria: 'Đánh giá Shop',
      shopValue: 0,
      targetValue: '≥4.00/5',
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
        <OGTabsTable
          tabs={[
            {
              tabLabel: 'Vi phạm về đăng bán',
              tableData: saleViolationData,
              tableCol: saleOperationalEfficiencyTable,
            },
            {
              tabLabel: 'Quản Lý Đơn Hàng',
              tableData: orderManagementData,
              tableCol: saleOperationalEfficiencyTable,
            },
            {
              tabLabel: 'Chăm sóc khách hàng',
              tableData: customerCareData,
              tableCol: saleOperationalEfficiencyTable,
            },
            {
              tabLabel: 'Mức độ hài lòng của Người Mua',
              tableData: buyerSatisfactionData,
              tableCol: saleOperationalEfficiencyTable,
            },
          ]}
        />
      </Card>
    </>
  );
}
