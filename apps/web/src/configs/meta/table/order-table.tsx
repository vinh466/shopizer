import { productApi } from '@shopizer/apis/product/product';
import { OrderStatusTag } from '@shopizer/atoms';
import { ORDER_ENDPOINT, ORDER_STATUS } from '@shopizer/constants';
import { OGSellerOrderDetailModal, TabTable } from '@shopizer/organisms';
import { Button } from 'antd';
import { ColumnsType } from 'antd/es/table';
import moment from 'moment';
import { ConfirmOrderButton } from 'src/components/organisms/modals/widgets/confirm-order-button';

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

function renderItemColumn(value: any, record: any) {
  const totalAmount = record?.items?.reduce(
    (acc: number, item: any) => acc + item.quantity,
    0,
  );
  const totalPrice = record?.items?.reduce(
    (acc: number, item: any) => acc + item.quantity * item.price,
    0,
  );
  return (
    <div style={{ display: 'flex', gap: 10, flexDirection: 'column' }}>
      <span>
        Số lượng: <strong>{totalAmount}</strong>
      </span>
      <span>
        Tổng Tiền{': '}
        <strong>
          {totalPrice.toLocaleString('vi-VN', {
            style: 'currency',
            currency: 'VND',
          })}
        </strong>
      </span>
    </div>
  );
}

const getOrderColumns = (type: 'seller' | 'buyer' = 'seller', allOrder = false) => {
  const orderable: ColumnsType<{
    // key: string;
    id: string;
  }> = [
    {
      key: 'id',
      title: 'Mã đơn hàng',
      dataIndex: 'id',
      width: '10%',
      render: (value) => {
        return value?.slice(-12);
      },
    },
    type === 'buyer'
      ? {
          key: 'shop',
          title: 'Shop',
          dataIndex: 'seller',
          width: '10%',
          render: (v) => {
            return v?.name;
          },
        }
      : {},
    {
      key: 'address',
      title: type === 'buyer' ? 'Địa chỉ nhận' : 'Địa chỉ giao',
      dataIndex: 'DeliveryAddress',
      width: '20%',
      render: ({ district, province, ward }) => {
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
      key: 'CreatedAt',
      title: 'Thời gian đặt',
      dataIndex: 'createdAt',
      width: '10%',
      render: (value) => {
        return moment(value).format('hh:mm DD/MM/YYYY');
      },
    },
    {
      key: 'CreatedAt',
      title: 'Tổng đơn hàng',
      dataIndex: 'items',
      width: '20%',
      render: renderItemColumn,
    },

    type === 'buyer'  
      ? {
          key: 'allOrder',
          title: 'Trạng thái',
          dataIndex: 'status',
          width: '15%',
          render: (v) => <OrderStatusTag status={v} />,
        }
      : {},
    {
      key: '123',
      title: '',
      dataIndex: 'id',
      width: '100px',
      render: (id, order) => {
        const { status } = order as any;
        return (
          <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
            {type === 'buyer' &&
              ['PROCESSING', 'PENDING']?.includes(status) && (
                <ConfirmOrderButton orderId={id} type={status} danger>
                  Hủy
                </ConfirmOrderButton>
              )}
            <OGSellerOrderDetailModal order={order}>
              Chi tiết
            </OGSellerOrderDetailModal>
            {type === 'seller' &&
              ['PROCESSING', 'PENDING']?.includes(status) && (
                <ConfirmOrderButton orderId={id} type={status}>
                  {status === 'PROCESSING'
                    ? 'Xác nhận gửi hàng'
                    : 'Xác nhận đơn'}
                </ConfirmOrderButton>
              )}
          </div>
        );
      },
    },
  ];
  return orderable;
};

export const orderTabTable: TabTable = [
  {
    tabHref: '/seller/order',
    tabLabel: 'Chờ xác nhận',
    tableCol: getOrderColumns(),
    apiEndpoint: ORDER_ENDPOINT.SELLER_LIST,
    baseQuery: '?listType=' + ORDER_STATUS.PENDING,
  },
  {
    tabKey: ORDER_STATUS.PROCESSING,
    tabLabel: 'Chờ lấy hàng',
    tableCol: getOrderColumns(),
    apiEndpoint: ORDER_ENDPOINT.SELLER_LIST,
    baseQuery: '?listType=' + ORDER_STATUS.PROCESSING,
  },
  {
    tabKey: ORDER_STATUS.SHIPPED,
    tabLabel: 'Đang vận chuyển',
    tableCol: getOrderColumns(),
    apiEndpoint: ORDER_ENDPOINT.SELLER_LIST,
    baseQuery: '?listType=' + ORDER_STATUS.SHIPPED,
  },
  {
    tabKey: ORDER_STATUS.DELIVERED,
    tabLabel: 'Đã giao hàng',
    tableCol: getOrderColumns(),
    apiEndpoint: ORDER_ENDPOINT.SELLER_LIST,
    baseQuery: '?listType=' + ORDER_STATUS.DELIVERED,
  },
  {
    tabKey: ORDER_STATUS.CANCELED,
    tabLabel: 'Đơn hủy',
    tableCol: getOrderColumns(),
    apiEndpoint: ORDER_ENDPOINT.SELLER_LIST,
    baseQuery: '?listType=' + ORDER_STATUS.CANCELED,
  },
];

export const buyerOrderTabTable: TabTable = [
  {
    tabHref: '/order',
    tabLabel: 'Tất cả',
    tableCol: getOrderColumns('buyer', true),
    apiEndpoint: ORDER_ENDPOINT.BUYER_LIST,
  },
  { 
    tabKey: ORDER_STATUS.PENDING,
    tabLabel: 'Chờ xác nhận',
    tableCol: getOrderColumns('buyer'),
    apiEndpoint: ORDER_ENDPOINT.BUYER_LIST,
    baseQuery: '?listType=' + ORDER_STATUS.PENDING,
  },
  {
    tabKey: ORDER_STATUS.PROCESSING,
    tabLabel: 'Chờ lấy hàng',
    tableCol: getOrderColumns('buyer'),
    apiEndpoint: ORDER_ENDPOINT.BUYER_LIST,
    baseQuery: '?listType=' + ORDER_STATUS.PROCESSING,
  },
  {
    tabKey: ORDER_STATUS.SHIPPED,
    tabLabel: 'Đang vận chuyển',
    tableCol: getOrderColumns('buyer'),
    apiEndpoint: ORDER_ENDPOINT.BUYER_LIST,
    baseQuery: '?listType=' + ORDER_STATUS.SHIPPED,
  },
  {
    tabKey: ORDER_STATUS.DELIVERED,
    tabLabel: 'Đã giao hàng',
    tableCol: getOrderColumns('buyer'),
    apiEndpoint: ORDER_ENDPOINT.BUYER_LIST,
    baseQuery: '?listType=' + ORDER_STATUS.DELIVERED,
  },
  {
    tabKey: ORDER_STATUS.CANCELED,
    tabLabel: 'Đơn hủy',
    tableCol: getOrderColumns('buyer'),
    apiEndpoint: ORDER_ENDPOINT.BUYER_LIST,
    baseQuery: '?listType=' + ORDER_STATUS.CANCELED,
  },
];
