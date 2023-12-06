"use client"

import { sellerOrderApi } from '@shopizer/apis/seller/order';
import { Button, notification } from 'antd';
import { useState } from 'react';

interface ConfirmOrderButtonProps {
  orderId: string;
  danger?: boolean;
  children: React.ReactNode;
  type?: 'PENDING' | 'PROCESSING' | 'BUYER_CANCELLED' | 'BUYER_RECEIVED';
}

export function ConfirmOrderButton(props: ConfirmOrderButtonProps) {
  const [loadingq, setLoadingq] = useState(false);
  const handleConfirmOrder = () => {
    setLoadingq(true);
    if (props.type === 'PENDING') {
      sellerOrderApi
        .confirm({
          id: props.orderId,
        })
        .then((err) => {
          if (!err.errorStatusCode) {
            notification.success({
              message: 'Xác nhận đơn hàng thành công',
            });
          }
          setLoadingq(false);
        });
    } else if (props.type === 'PROCESSING') {
      sellerOrderApi
        .shipping({
          id: props.orderId,
        })
        .then((err) => {
          if (!err.errorStatusCode) {
            notification.success({
              message: 'Xác nhận đã giao hàng cho đơn vị vận chuyển thành công',
            });
          }
          setLoadingq(false);
        });
    } else if (props.type === 'BUYER_CANCELLED') {
      sellerOrderApi
        .cancel({
          id: props.orderId,
        })
        .then((err) => {
          if (!err.errorStatusCode) {
            notification.success({
              message: 'Hủy đơn hàng thành công',
            });
          }
          setLoadingq(false);
        });
    } else if (props.type === 'BUYER_RECEIVED') {
      sellerOrderApi
        .received({
          id: props.orderId,
        })
        .then((err) => {
          if (!err.errorStatusCode) {
            notification.success({
              message: 'Đã xác nhận đơn hàng',
            });
          }
          setLoadingq(false);
        });
    }

    PubSub.publish('reload_table', null);
  };
  return (
    <Button
      type="primary"
      onClick={handleConfirmOrder}
      loading={loadingq}
      disabled={loadingq}
      danger={props.danger}
    >
      {props.children}
    </Button>
  );
}
