import { productApi } from '@shopizer/apis/product/product';
import {
  BACKEND_PRODUCT_IMAGE_PATH,
  PRODUCT_ENDPOINT,
  PRODUCT_STATUS,
  SELLER_PRODUCT_PAGE,
} from '@shopizer/constants';
import { SellerDeleteBtn } from '@shopizer/molecules';
import { TabTable } from '@shopizer/organisms';
import { Button, Popconfirm, notification } from 'antd';
import { ColumnsType } from 'antd/es/table';
import Image from 'next/image';
import Link from 'next/link';

function getPrice(variations: any) {
  const variationPrice = variations?.map((variation: any) => variation.price);
  const maxPrice = Math.max(...variationPrice);
  const minPrice = Math.min(...variationPrice);

  if (variationPrice.length > 1 && maxPrice !== minPrice) {
    return `${minPrice} - ${maxPrice} đ`;
  } else {
    return `${maxPrice || 0} đ`;
  }
}
function getStock(variations: any) {
  return variations?.reduce(
    (acc: number, variation: any) => acc + variation.stock,
    0,
  );
}
const orderable: ColumnsType<{
  // key: string;
  id: string;
}> = [
  {
    key: 'id',
    title: 'Mã đơn hàng',
    sorter: true,
    dataIndex: 'ProductVariant',
    width: '20%',
    render(value, record, index) {
      return getPrice(value);
    },
  },
  {
    key: 'address',
    title: 'Địa chỉ',
    sorter: true,
    dataIndex: 'ProductVariant',
    width: '20%',
    render(value, record, index) {
      return getStock(value);
    },
  },
  {
    key: 'CreatedAt',
    title: 'Ngày đặt hàng',
    sorter: true,
    dataIndex: 'salesCount',
    width: '15%',
  },
  {
    key: 'status',
    title: 'Trạng thái',
    sorter: true,
    dataIndex: 'salesCount',
    width: '10%',
  },
  {
    key: '123',
    title: '',
    dataIndex: 'id',
    width: '200px',
    render: (value) => {
      return (
        <div style={{ display: 'flex', gap: 10 }}>
            <Button>Xác nhận</Button>
        </div>
      );
    },
  },
];
 

export const orderTabTable: TabTable = [
  {
    tabHref: '/seller/order',
    tabLabel: 'Chờ xác nhận',
    tableCol: orderable,
    apiEndpoint: PRODUCT_ENDPOINT.SELLER_LIST,
  },
  {
    tabKey: 'pending',
    tabLabel: 'Chờ lấy hàng',
    tableCol: orderable,
    apiEndpoint: PRODUCT_ENDPOINT.SELLER_LIST,
    baseQuery: '?listType=' + PRODUCT_STATUS.ACTIVE,
  },
  {
    tabKey: 'processing',
    tabLabel: 'Đang vận chuyển',
    tableCol: orderable,
    apiEndpoint: PRODUCT_ENDPOINT.SELLER_LIST,
    baseQuery: '?listType=' + PRODUCT_STATUS.SOLD_OUT,
  },
  {
    tabKey: 'shipped',
    tabLabel: 'Đã giao hàng',
    tableCol: orderable,
    apiEndpoint: PRODUCT_ENDPOINT.SELLER_LIST,
    baseQuery: '?listType=' + PRODUCT_STATUS.SOLD_OUT,
  },
  {
    tabKey: 'canceled',
    tabLabel: 'Đơn hủy',
    tableCol: orderable,
    apiEndpoint: PRODUCT_ENDPOINT.SELLER_LIST,
    baseQuery: '?listType=' + PRODUCT_STATUS.SOLD_OUT,
  },
];
