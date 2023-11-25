import { productApi } from '@shopizer/apis/product/product';
import { Button, Popconfirm, notification } from 'antd';
import { use, useEffect, useState } from 'react';

interface SellerDeleteBtnProps {
  productId: string;
  onloading?: (loading: boolean) => void;
  onSuccess?: () => void;
}

export function SellerDeleteBtn(props: SellerDeleteBtnProps) {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (props.onloading) {
      props.onloading(loading);
    }
  }, [loading]);
  return (
    <Popconfirm
      title="Xóa sản phẩm"
      description="Bạn muốn xóa sản phẩm này?"
      okText="Xóa"
      cancelText="Hủy"
      okButtonProps={{ danger: true }}
      onConfirm={() => {
        console.log('delete');
        setLoading(true);
        productApi
          .remove(props.productId)
          .then((res) => {
            if (!res.errorStatusCode) {
              PubSub.publish('reload_table', null);
              notification.success({
                message: 'Xóa sản phẩm thành công',
              });
              props.onSuccess?.();
            } else {
              console.error(res);
              // notification.error({
              //   message: 'Xóa sản phẩm thất bại',
              // });
            }
          })
          .finally(() => {
            setLoading(false);
          });
      }}
    >
      <Button danger loading={loading}>
        Xóa
      </Button>
    </Popconfirm>
  );
}
