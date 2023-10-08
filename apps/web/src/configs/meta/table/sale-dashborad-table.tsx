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
    tabLabel: 'Vi phạm về đăng bán',
    tableData: saleViolationData,
    tableCol: saleOperationalEfficiencyTable,
  },
  {
    tabId: '2',
    tabLabel: 'Quản Lý Đơn Hàng',
    tableData: orderManagementData,
    tableCol: saleOperationalEfficiencyTable,
  },
  {
    tabId: '3',
    tabLabel: 'Chăm sóc khách hàng',
    tableData: customerCareData,
    tableCol: saleOperationalEfficiencyTable,
  },
  {
    tabId: '4',
    tabLabel: 'Mức độ hài lòng của Người Mua',
    tableData: buyerSatisfactionData,
    tableCol: saleOperationalEfficiencyTable,
  },
];
