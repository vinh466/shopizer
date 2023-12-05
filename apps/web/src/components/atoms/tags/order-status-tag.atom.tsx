import { Tag } from "antd";

interface OrderStatusTagProps {
  status: string;
}

export function OrderStatusTag(props: OrderStatusTagProps) {
  const statusText =
    props.status === 'PENDING'
      ? 'Chờ xác nhận'
      : props.status === 'PROCESSING'
      ? 'Chờ lấy hàng'
      : props.status === 'SHIPPED'
      ? 'Đang vận chuyển'
      : props.status === 'DELIVERED'
      ? 'Đã giao hàng'
      : props.status === 'CANCELED'
      ? 'Đã hủy'
      : '';
    const statusColor =
      props.status === 'PENDING'
        ? 'orange'
        : props.status === 'PROCESSING'
        ? 'blue'
        : props.status === 'SHIPPED'
        ? 'green'
        : props.status === 'DELIVERED'
        ? 'purple'
        : props.status === 'CANCELED'
        ? 'red'
        : '';
  return <Tag color={statusColor}>{statusText}</Tag>;
}
