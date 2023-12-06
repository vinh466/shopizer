"use client"

import { Tag } from 'antd';

interface SellerStatusTagProps {
  status: string;
}

export function SellerStatusTag(props: SellerStatusTagProps) {
  const statusText =
    props.status === 'VERIFIED'
      ? 'Đã duyệt'
      : props.status === 'PENDING'
      ? 'Chờ duyệt'
      : props.status === 'REJECTED'
      ? 'Đã từ chối'
      : props.status === 'BLOCKED'
      ? 'Đã Khóa'
      : '';
  const statusColor =
    props.status === 'PENDING'
      ? 'orange'
      : props.status === 'VERIFIED'
      ? 'green'
      : props.status === 'REJECTED'
      ? 'gray'
      : props.status === 'BLOCKED'
      ? 'red'
      : '';
  return <Tag color={statusColor}>{statusText}</Tag>;
}
