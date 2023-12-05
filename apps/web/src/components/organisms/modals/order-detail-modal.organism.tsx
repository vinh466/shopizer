'use client';

import { Button, Modal } from 'antd';
import { useState } from 'react';
import { ConfirmOrderButton } from './widgets/confirm-order-button';
import { MOrderProductPreview } from '@shopizer/molecules';

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

  const handleCancel = () => {
    setOpen(false);
  };
  return (
    <>
      <Button onClick={showModal}>{children}</Button>
      <Modal
        open={open}
        title="Title"
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
            <Button>Xác nhận đơn</Button>
          </div>,
        ]}
      >
        <div>
          <input type="text" />
        </div>
        <div>
          <input type="text" />
        </div>
        <div>
          <input type="text" />
        </div>
        <div>
          <input type="text" />
        </div>

        <input type="text" />
        <input type="text" />
        <input type="text" />
        <MOrderProductPreview order={order} />
      </Modal>
    </>
  );
}
