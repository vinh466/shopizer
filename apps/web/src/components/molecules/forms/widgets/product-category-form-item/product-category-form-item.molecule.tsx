import { Breadcrumb, Button, Modal, Select } from 'antd';
import { useState } from 'react';
import { EditOutlined } from '@ant-design/icons';

interface MProductCategoryFormItemProps {
  value?: any;
  onChange?: any;
}

export function MProductCategoryFormItem(props: MProductCategoryFormItemProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      {/* <Button
        onClick={showModal}
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'row-reverse',
          alignItems: 'center',
        }}
        icon={<EditOutlined />}
      >
        <Breadcrumb
          separator=">"
          items={[
            {
              title: 'Home',
            },
            {
              title: 'Application Center',
            },
            {
              title: 'Application List',
            },
            {
              title: 'An Application',
            },
          ]}
        />
      </Button>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal> */}
    </>
  );
}
