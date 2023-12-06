"use client"

import { adminApi } from '@shopizer/apis/admin/admin';
import { SellerStatusTag } from '@shopizer/atoms';
import {
  ADMIN_ENDPOINT,
  ADMIN_PAGE,
  ORDER_ENDPOINT,
} from '@shopizer/constants';
import { TabTable } from '@shopizer/organisms';
import { Button, Tag } from 'antd';

const changeSellerStatus = (id: any, status: any) => {
  PubSub.publish('reload_table');
  adminApi.changgeSellerStatus(id, status);
};

const sellerManageTable = [
  {
    key: '1',
    title: 'Shop',
    dataIndex: 'name',
    width: '20%',
    render: (name: any, record: any) => name || '',
  },
  {
    key: '2',
    title: 'Địa chỉ',
    dataIndex: 'pickupAddress',
    width: '35%',
    render: (pickupAddress: any, record: any) => {
      const { ward, district, province } = pickupAddress?.[0] || {};
      return (
        ward?.full_name +
        ', ' +
        district?.full_name +
        ', ' +
        province?.full_name
      );
    },
  },
  {
    key: '3',
    title: 'Trang thái',
    dataIndex: 'status',
    width: '15%',
    render: (status: 'VERIFIED' | 'PENDING', record: any) => {
      return SellerStatusTag({ status });
    },
  },
  {
    key: '123',
    title: '',
    dataIndex: 'status',
    width: '100px',
    render: (status: any, record: any) => {
      return (
        <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
          {status === 'PENDING' && (
            <div className="d-flex gap-2">
              <Button
                type="primary"
                onClick={() => changeSellerStatus(record?.id, 'VERIFIED')}
              >
                Duyệt
              </Button>
              <Button
                type="primary"
                ghost
                danger
                onClick={() => changeSellerStatus(record?.id, 'REJECTED')}
              >
                Từ chối
              </Button>
            </div>
          )}
          {status === 'VERIFIED' && (
            <Button
              type="primary"
              danger
              ghost
              onClick={() => changeSellerStatus(record?.id, 'BLOCKED')}
            >
              Khóa
            </Button>
          )}
          {status === 'BLOCKED' && (
            <Button
              type="primary"
              ghost
              onClick={() => changeSellerStatus(record?.id, 'VERIFIED')}
            >
              Mở Khóa
            </Button>
          )}
        </div>
      );
    },
  },
];

export const manageSellerTabTable: TabTable = [
  {
    tabHref: ADMIN_PAGE.DASHBOARD.PATH,
    tabLabel: 'Tất cả',
    tableCol: sellerManageTable,
    apiEndpoint: ADMIN_ENDPOINT.SELLER_LIST,
    isAdminApi: true,
  },
];
