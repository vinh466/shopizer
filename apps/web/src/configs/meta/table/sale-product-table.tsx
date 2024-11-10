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
const productTable: ColumnsType<{
  // key: string;
  product: any;
  sku: string;
  price: number;
  stock: number;
  salesCount: number;
  image?: string;
}> = [
  {
    key: 'product',
    title: 'Sản phẩm',
    dataIndex: 'name',
    width: '40%',
    render(value, record, index) {
      return (
        <div style={{ display: 'flex', gap: 10 }}>
          {record.image && (
            <Image
              src={BACKEND_PRODUCT_IMAGE_PATH + record.image}
              alt={record.image}
              style={{ objectFit: 'contain' }}
              width={60}
              height={60}
            />
          )}
          <div className='d-flex align-items-center'>
            <div>{value}</div> 
          </div>
        </div>
      );
    },
  },
  // {
  //   key: 'sku',
  //   title: 'SKU',
  //   dataIndex: 'sku',
  //   width: '15%',
  // },
  {
    key: 'price',
    title: 'Giá',
    sorter: true,
    dataIndex: 'ProductVariant',
    width: '20%',
    render(value, record, index) {
      return getPrice(value);
    },
  },
  {
    key: 'stock',
    title: 'Kho',
    sorter: true,
    dataIndex: 'ProductVariant',
    width: '12%',
    render(value, record, index) {
      return getStock(value);
    },
  },
  // {
  //   key: 'salesCount',
  //   title: 'Doanh số',
  //   sorter: true,
  //   dataIndex: 'salesCount',
  //   width: '12%',
  // },
  {
    key: '123',
    title: '',
    dataIndex: 'id',
    width: '200px',
    render: (value) => {
      return (
        <div style={{ display: 'flex', gap: 10 }}>
          <Link href={SELLER_PRODUCT_PAGE.EDIT.PATH + value}>
            <Button>Chỉnh Sửa</Button>
          </Link>
          <SellerDeleteBtn productId={value} />
        </div>
      );
    },
  },
];

const violateProductTable = [
  {
    key: 'product',
    title: 'Sản phẩm',
    dataIndex: 'product',
    width: '30%',
    render: (product: any) => product?.name || '',
  },
  {
    key: 'updateAt',
    title: 'Thời gian cập nhập',
    dataIndex: 'updateAt',
    width: '15%',
  },
  {
    key: 'deadline',
    title: 'Hạn sửa lỗi ',
    dataIndex: 'deadline',
    width: '15%',
  },
  {
    key: 'violateType',
    title: 'Loại vi phạm',
    dataIndex: 'violateType',
    width: '12%',
  },
  {
    key: 'violateReason',
    title: 'Lý do vi phạm',
    dataIndex: 'violateReason',
    width: '12%',
  },
  {
    key: 'suggest',
    title: 'Gợi ý',
    dataIndex: 'suggest',
    width: '12%',
  },
  {
    key: '',
    title: '',
    dataIndex: '',
    width: '200px',
    render: () => <a>Xem chi tiết</a>,
  },
];

export const saleProductTabTable: TabTable = [
  {
    tabHref: '/seller/product/list',
    tabLabel: 'Tất cả',
    tableCol: productTable,
    apiEndpoint: PRODUCT_ENDPOINT.SELLER_LIST,
  },
  {
    tabKey: 'active',
    tabLabel: 'Đang hoạt động',
    tableCol: productTable,
    apiEndpoint: PRODUCT_ENDPOINT.SELLER_LIST,
    baseQuery: '?listType=' + PRODUCT_STATUS.ACTIVE,
  },
  {
    tabKey: 'sold-out',
    tabLabel: 'Hết hàng',
    tableCol: productTable,
    apiEndpoint: PRODUCT_ENDPOINT.SELLER_LIST,
    baseQuery: '?listType=' + PRODUCT_STATUS.SOLD_OUT,
  },
  // {
  //   tabKey: 'reviewing',
  //   tabLabel: 'Chờ duyệt',
  //   tableCol: productTable,
  //   apiEndpoint: PRODUCT_ENDPOINT.SELLER_LIST,
  // },
  {
    tabKey: 'violate',
    tabLabel: 'Vi phạm',
    tableCol: violateProductTable,
    apiEndpoint: PRODUCT_ENDPOINT.SELLER_LIST,
    baseQuery: '?listType=' + PRODUCT_STATUS.VIOLATE,
  },
  // {
  //   tabKey: 'unlisted',
  //   tabLabel: 'Đã ẩn',
  //   tableCol: productTable,
  //   apiEndpoint: PRODUCT_ENDPOINT.SELLER_LIST,
  //   baseQuery: '?listType=' + PRODUCT_STATUS.UNLISTED,
  // },
];
