import { Avatar, Button, Row, Segmented, Space } from 'antd';
import React from 'react';
import { PlusOutlined } from '@ant-design/icons';

export function MProductDetail() {
  const [selected, setSelected] = React.useState(1);

  const handleSelectType = (id: number) => {
    setSelected(id);
  };
  return (
    <div className="product-detail">
      <div className="product-detail-section">
        <div className="title">
          <h2>
            Máy tăm nước cầm tay Panasonic công nghệ siêu âm EW1511 - Hàng Chính
            Hãng - Trắng
          </h2>
        </div>
        <div className="content">
          <h3 className="price">1.000.000 đ</h3>
          <div className="product-type"></div>
        </div>
      </div>

      <div className="product-detail-section product-type">
        <div className="title">
          <h4>Loại</h4>
        </div>
        <Space>
          <Button
            className={selected === 1 ? 'selected' : ''}
            onClick={() => handleSelectType(1)}
          >
            Loại 1
          </Button>
          <Button
            className={selected === 2 ? 'selected' : ''}
            onClick={() => handleSelectType(2)}
          >
            Loại 2
          </Button>
          <Button
            className={selected === 3 ? 'selected' : ''}
            onClick={() => handleSelectType(3)}
          >
            Loại 3
          </Button>
          <Button
            className={selected === 4 ? 'selected' : ''}
            onClick={() => handleSelectType(4)}
          >
            Loại 4
          </Button>
        </Space>
      </div>

      <div className="product-detail-section seller">
        <div className="title">
          <h4>Thông tin nhà bán</h4>
        </div>

        <div className="seller-card">
          <div className="avatar">
            <Avatar size={40} src="/shopizer-logo-icon.png" />
          </div>
          <div className="info">
            <h2>Vinh Shop</h2>
            <h4>0 Theo dõi</h4>
          </div>
          <div className="action">
            <Button icon={<PlusOutlined />}>Theo dõi</Button>
          </div>
        </div>
      </div>

      <div className="product-detail-section related-products">
        <div className="title">
          <h4>Thông tin chi tiết</h4>
        </div>

        <div>None</div>
      </div>

      <div className="product-detail-section related-products">
        <div className="title">
          <h4>Sản phẩm tương tự</h4>
        </div>

        <div style={{ height: 500 }}>None</div>
      </div>
      <style jsx global>{`
        .product-detail {
          .product-detail-section {
            background-color: #fff;
            padding: 16px;
            border-radius: 6px;
            margin-bottom: 16px;

            .title {
              color: rgb(39, 39, 42);
              margin: 0px;
              & h2 {
                font-size: 20px;
                font-weight: 500;
                line-height: 150%;
                word-break: break-word;
                white-space: break-spaces;
              }
              & h4 {
                margin: 0 0 8px;
                font-size: 14px;
                font-style: normal;
                font-weight: 600;
                padding-right: 20px;
              }
            }
            .content {
            }
            .price h3 {
              font-size: 24px;
              font-weight: 600;
              line-height: 150%;
            }
            &.seller {
              .seller-card {
                display: flex;
                gap: 16px;
                align-items: center;
                .avatar img {
                  object-fit: fill;
                }
                .info {
                  flex: 1;

                  & h2 {
                    margin: 0;
                    font-size: 15px;
                    font-weight: 500;
                    line-height: 1.6;
                    color: rgb(36, 36, 36);
                  }
                  & h4 {
                    margin: 0;
                    font-size: 14px;
                    font-style: normal;
                    font-weight: 400;
                    line-height: 150%;
                  }
                }
              }
            }
            &.product-type {
              .selected {
                border-color: #1677ff;
                color: #1677ff;
              }
            }
          }
        }
      `}</style>
    </div>
  );
}
