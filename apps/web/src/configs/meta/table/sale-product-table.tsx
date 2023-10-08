import { TabTable } from '@shopizer/organisms';
import { ColumnsType } from 'antd/es/table';

const productTable: ColumnsType<{
  // key: string;
  product: any;
  sku: string;
  price: number;
  stock: number;
  salesCount: number;
}> = [
  {
    key: 'product',
    title: 'Sản phẩm',
    dataIndex: 'name',
    width: '30%',
  },
  {
    key: 'sku',
    title: 'SKU',
    dataIndex: 'sku',
    width: '15%',
  },
  {
    key: 'price',
    title: 'Giá',
    dataIndex: 'price',
    width: '15%',
  },
  {
    key: 'stock',
    title: 'Kho',
    dataIndex: 'stock',
    width: '12%',
  },
  {
    key: 'salesCount',
    title: 'Doanh số',
    dataIndex: 'salesCount',
    width: '12%',
  },
  {
    key: '123',
    title: '',
    dataIndex: '',
    width: '200px',
    render: () => <a>Xem chi tiết</a>,
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
    tabHref: '/sales/product/list',
    tabLabel: 'Tất cả',
    tableData: [],
    tableCol: productTable,
  },
  {
    tabKey: 'active',
    tabLabel: 'Đang hoạt động',
    tableData: [],
    tableCol: productTable,
  },
  {
    tabKey: 'sold-out',
    tabLabel: 'Hết hàng',
    tableData: [],
    tableCol: productTable,
  },
  {
    tabKey: 'reviewing',
    tabLabel: 'Chờ duyệt',
    tableData: [],
    tableCol: productTable,
  },
  {
    tabKey: 'violate',
    tabLabel: 'Vi phạm',
    tableData: [],
    tableCol: violateProductTable,
  },
  {
    tabKey: 'unlisted',
    tabLabel: 'Đã ẩn',
    tableData: [],
    tableCol: productTable,
  },
];
