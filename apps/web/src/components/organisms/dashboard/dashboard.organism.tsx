'use client';

import { Card, Col, Row, Statistic, Table, Tabs, Typography } from 'antd';
import React from 'react';
import OGSummaryStatistic from './widgets/summary-statistic.organism';
import { OGTabsTable } from '@shopizer/organisms';
import { saleDashboardTabTable } from '@shopizer/configs/meta/table';
import {
  SELLER_ENDPOINT,
  SELLER_ORDER_PAGE,
  SELLER_PRODUCT_PAGE,
  SUMMARY_ENDPOINT,
} from '@shopizer/constants';
import useSWR from 'swr';
import { fetcher } from '@shopizer/apis/fetcher';

export function OGDashboard() {
  const [summary, setSummary] = React.useState<any[]>(
    getDashboardSummary(null),
  );

  function getDashboardSummary(summaryValues: any) {
    const summary = [
      {
        title: 'Đơn chờ xác nhận',
        value: summaryValues?.[0]?.value || 0,
        href: SELLER_ORDER_PAGE.LIST.PATH,
      },
      {
        title: 'Đơn chờ lấy hàng',
        value: summaryValues?.[1]?.value || 0,
        href: SELLER_ORDER_PAGE.LIST_PROCESSING.PATH,
      },
      {
        title: 'Đơn đang vận chuyển',
        value: summaryValues?.[2]?.value || 0,
        href: SELLER_ORDER_PAGE.LIST_PROCESSING.PATH,
      },
      {
        title: 'Đơn đã giao',
        value: summaryValues?.[3]?.value || 0,
        href: SELLER_ORDER_PAGE.LIST_COMPLETED.PATH,
      },
      {
        title: 'Đơn hủy',
        value: summaryValues?.[4]?.value || 0,
        href: SELLER_ORDER_PAGE.LIST_CANCELLED.PATH,
      },
      // {
      //   title: 'Trả Hàng/Hoàn Tiền Chờ Xử Lý',
      //   value: summaryValues?.[4]?.value || 0,
      //   href: SELLER_ORDER_PAGE.LIST_RETURN_LIST.PATH,
      // },
      {
        title: 'Sản phẩm bị khóa',
        value: summaryValues?.[5]?.value || 0,
        href: SELLER_PRODUCT_PAGE.LIST_VIOLATE.PATH,
      },
      {
        title: 'Sản phẩm hết hàng',
        value: summaryValues?.[6]?.value || 0,
        href: SELLER_PRODUCT_PAGE.LIST_SOLD_OUT.PATH,
      },
    ];
    return summary;
  }

  useSWR(SUMMARY_ENDPOINT.DASHBOARD_SUMMARY, (url) =>
    fetcher(url).then((res) => {
      if (!res.errorStatusCode) {
        const summary = getDashboardSummary(res.results);
        setSummary(summary);
      }
    }),
  );
  return (
    <>
      <Card style={{ width: '100%' }} className="sales-dashboard">
        <Typography.Title level={3} style={{ marginTop: 0 }}>
          Tổng quan
        </Typography.Title>
        <Typography.Paragraph>
          Tổng quan về gian hàng của bạn
        </Typography.Paragraph>
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