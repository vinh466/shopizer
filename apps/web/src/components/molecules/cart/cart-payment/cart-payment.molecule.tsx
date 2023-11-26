import { Radio } from 'antd';
import { DollarOutlined } from '@ant-design/icons';

export function MCartPayment() {
  return (
    <Radio.Group
      className="payment-select-group"
      name="radiogroup"
      defaultValue={1}
    >
      <Radio className="payment-option" value={1}>
        <div className="payment-option-content">
          <DollarOutlined
            style={{ fontSize: '150%', color: '#1890ff' }}
          />
          <h4 className="my-0">Thanh Toán Khi Nhận Hàng</h4>
        </div>
      </Radio>

      <style jsx global>{`
        .payment-select-group {
          display: flex;
          flex-direction: column;
          justify-content: space-between;

          .payment-option {
            border: 1px solid #e5e5e5;
            border-radius: 6px;
            padding: 16px;
            margin-bottom: 16px;
            display: flex;
            align-items: center;
            cursor: pointer;
            transition: all 0.2s ease-in-out;
            overflow: hidden;

            &:hover {
              border-color: #1890ff;
            }

            &.ant-radio-wrapper-checked {
              border-color: #1890ff;
              position: relative;
              &::before {
                content: '';
                position: absolute;
                bottom: 0px;
                right: 0px;
                border-radius: 10px 0px 0px 0px;
                width: 12px;
                height: 12px;
                background-color: #1890ff;
              }
            }
            .ant-radio-inner {
              display: none;
            }
            .payment-option-content {
              display: flex;
              gap: 8px;
            }
          }
        }
      `}</style>
    </Radio.Group>
  );
}
