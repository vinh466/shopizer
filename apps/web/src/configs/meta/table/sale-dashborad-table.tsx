import { SUMMARY_ENDPOINT } from '@shopizer/constants';

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
export const saleDashboardTabTable = [
  {
    tabId: '1',
    tabLabel: 'Quản Lý Đơn Hàng',
    tableCol: saleOperationalEfficiencyTable,
    apiEndpoint: SUMMARY_ENDPOINT.ORDER_MANAGEMENT,
  },
  {
    tabId: '2',
    tabLabel: 'Vi phạm về đăng bán',
    tableCol: saleOperationalEfficiencyTable,
    apiEndpoint: SUMMARY_ENDPOINT.SALE_VIOLATION,
  },
  {
    tabId: '3',
    tabLabel: 'Chăm sóc khách hàng',
    tableCol: saleOperationalEfficiencyTable,
    apiEndpoint: SUMMARY_ENDPOINT.CUSTOMER_CARE,
  },
  {
    tabId: '4',
    tabLabel: 'Mức độ hài lòng của Người Mua',
    tableCol: saleOperationalEfficiencyTable,
    apiEndpoint: SUMMARY_ENDPOINT.BUYER_SATISFACTION,
  },
];
