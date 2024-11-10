'use client';

import { Button, Modal } from 'antd';
import { useState } from 'react';
import { ConfirmOrderButton } from './widgets/confirm-order-button';
import { MOrderProductPreview } from '@shopizer/molecules';
import moment from 'moment';
import { OrderStatusTag } from '@shopizer/atoms';

interface OGSellerOrderDetailModalProps {
  children: React.ReactNode;
  order: any;
}

export function OGSellerOrderDetailModal({
  order,
  children,
}: OGSellerOrderDetailModalProps) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 3000);
  };

  function getAddress({ detail, district, province, ward }: any) {
    return (
      detail +
      ', ' +
      ward?.full_name +
      ', ' +
      district?.full_name +
      ', ' +
      province?.full_name
    );
  }

  const handleCancel = () => {
    setOpen(false);
  };
  return (
    <>
      <Button onClick={showModal}>{children}</Button>
      <Modal
        open={open}
        title="Chi Tiết đơn hàng"
        onOk={handleOk}
        width={900}
        onCancel={handleCancel}
        footer={[
          <div
            key={'footer'}
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              gap: 10,
            }}
          >
            <Button onClick={handleCancel}>Trở về</Button>
            {/* <Button>Xác nhận đơn</Button> */}
          </div>,
        ]}
      >
        <div>
          <div className="d-flex justify-content-between">
            <div>
              <div>
                <strong>Mã đơn hàng: </strong>
                <span>{order?.id?.slice(-12)}</span>
              </div>
              <div>
                <strong>Ngày đặt hàng: </strong>
                <span>
                  {moment(order?.createdAt).format('hh:mm DD/MM/YYYY')}
                </span>
              </div>
            </div>
            <div>
              <strong>Trạng thái: </strong>
              <OrderStatusTag status={order?.status} />
            </div>
          </div>
          <div className="mt-3">
            <h5 className="my-0 mt-2">Thông tin người nhận</h5>
            <div className="mx-4">
              <div>
                <strong>Họ tên: </strong>
                <span>{order?.orderItemsJson?.buyer?.name}</span>
              </div>
              <div>
                <strong>Email: </strong>
                <span>{order?.user?.email}</span>
              </div>
              <div>
                <strong>Điện thoại: </strong>
                <span>{order?.orderItemsJson?.buyer?.phone}</span>
              </div>
              <div>
                <strong>Địa chỉ: </strong>
                <span>{getAddress(order?.DeliveryAddress || {})}</span>
              </div>
            </div>
          </div>
          <div>
            <h5 className="my-0 mt-2">Thông tin người bán</h5>
            <div className="mx-4">
              <div>
                <strong>Người bán: </strong>
                <span>{order?.seller?.name}</span>
              </div>
              <div>
                <strong>Điện thoại: </strong>
                <span>{order?.seller?.pickupAddress?.[0]?.phone}</span>
              </div>
              <div>
                <strong>Địa chỉ: </strong>
                <span>
                  {getAddress(order?.seller?.pickupAddress?.[0] || {})}
                </span>
              </div>
            </div>
          </div>
        </div>
        <MOrderProductPreview order={order} />
      </Modal>
    </>
  );
}
