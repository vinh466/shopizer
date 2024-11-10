import { Col, Row } from 'antd';
import { MRowCartTable } from '../cart/cart-table/row-cart-table.molecules';

interface MOrderProductPreviewProps {
  order: any;
}

export function MOrderProductPreview(props: MOrderProductPreviewProps) {
  return (
    <div className="order-product-list">
      <Row className="list-header">
        <Col span="24">
          <div className="grid-table header px-3">
            <span style={{}}>Sản phẩm</span>
            <span>Đơn giá</span>
            <span>Số lượng</span>
            <span>Thành tiền</span>
          </div>
        </Col>
      </Row>
      <Row gutter={[0, 16]} className="list-content">
        <Col span="24">
          {props.order?.orderItemsJson?.orderItems
            ?.find(
              (orderItem: any) => orderItem.seller.id === props.order.sellerId,
            )
            ?.cartItems?.reduce((a: any, c: any) => {
              a.push(c);
              return a;
            }, [])
            ?.map((cartItem: any, index: number) => {
              return (
                <MRowCartTable
                  cartItem={cartItem}
                  key={index}
                  isConfirm
                  cartSelected={props.order.orderItemsJson.itemIds}
                />
              );
            })}
        </Col>
      </Row>
      <style jsx global>{`
        .order-product-list {
          font-weight: 400;
          font-size: 13px;
          color: rgb(36, 36, 36);

          .grid-table {
            display: grid;
            grid-template-columns: auto 100px 100px 120px 32px;
            column-gap: 24px;
            align-items: center;
            padding: 8px 16px;
            border-radius: 4px;

            &:not(.header):hover {
              background-color: #f5f5f5;
              cursor: pointer;
            }
            &.row-table-child {
              grid-template-columns: 60px auto 100px 100px 120px 32px;
            }
            .grid-padding-col {
              border-left: 1px solid #f5f5f5;
            }
          }
          .list-header {
            background: rgb(255, 255, 255);
            padding: 8px 16px;
            border-radius: 4px;
            margin-bottom: 12px;
            top: 0;
            position: sticky;
            z-index: 99;

            &::after {
              content: '';
              background: #f5f5f5;
              width: 100%;
              height: 16px;
              position: absolute;
              left: 0px;
              bottom: -16px;
              right: 0px;
            }
          }
          .list-content {
            background-color: #fff;
            margin-top: 16px;
            padding: 16px;
            border-radius: 6px;
            max-height: calc(68vh - 210px);
            overflow-y: auto;

            .product-info {
              display: flex;
              align-items: center;
              .product-name {
                margin-left: 16px;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
              }
            }
          }
        }
      `}</style>
    </div>
  );
}
