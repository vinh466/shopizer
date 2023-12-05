'use client';
import { provincesApi } from '@shopizer/apis/provinces/provinces';
import {
  Button,
  Empty,
  Form,
  FormInstance,
  Input,
  Modal,
  Select,
  Space,
  Spin,
} from 'antd';
import { useEffect, useState } from 'react';

interface MSelectAddressFormItemProps {
  value?: any;
  onChange?: (state: any) => void;
  form?: FormInstance;
  isEdit?: boolean;
}
const { Option } = Select;

const filterOption = (
  input: string,
  option?: { label: string; value: string },
) => {
  const search = input
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D');
  const labels = (option?.label || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D');

  return labels.includes(search);
};

export default function MSelectAddressFormItem(
  props: MSelectAddressFormItemProps,
) {
  const [isFetching, setIsFetching] = useState(true);
  const [provinces, setProvinces] = useState<any[]>([]);
  const [districts, setDistricts] = useState<any[]>([]);
  const [wards, setWards] = useState<any[]>([]);

  const handleChooseProvince = (value: any) => {
    setDistricts([]);
    setWards([]);
    props.form?.setFieldValue(['address', 'district'], undefined);
    props.form?.setFieldValue(['address', 'ward'], undefined);
    getAddresses(value).then((districts) => {
      props.onChange?.((from: any) => ({
        ...from,
        address: {
          ...from.address,
          ward: undefined,
        },
      }));
      setDistricts(districts);
    });
  };
  const handleChooseDistrict = async (value: any) => {
    setWards([]);
    props.form?.setFieldValue(['address', 'ward'], undefined);
    getAddresses(value).then((wards) => {
      setWards(wards);
    });
  };
  useEffect(() => {
    const getProvinces = async () => {
      const provinces = await getAddresses();
      setProvinces(provinces);
      if(props.isEdit) {
        const address = props.form?.getFieldValue('address');
        
        if(address?.district) {
          const districts = await getAddresses(address.province);
          setDistricts(districts);
        }
        if(address?.ward) {
          const wards = await getAddresses(address.district);
          setWards(wards);
        }
      }
    };
    getProvinces();
  }, []);

  useEffect(() => {
    console.log();
  }, []);
  async function getAddresses(nextCode?: string) {
    try {
      setIsFetching(true);
      const response = await provincesApi.getNextLevelAddress({
        nextCode: nextCode,
      }); 
      return response?.results || [];
    } catch (e) {
      return [];
    } finally {
      setIsFetching(false);
    }
  }

  return (
    <div className="address-select-input">
      <Form.Item>
        <Space.Compact block>
          <Form.Item
            name={['address', 'province']}
            noStyle
            rules={[{ required: true, message: 'Hãy chọn Thành phố/tỉnh' }]}
          >
            <Select
              placeholder="Thành phố/Tỉnh"
              onChange={handleChooseProvince}
              notFoundContent={
                isFetching ? <Spin /> : <Empty description="Không dữ liệu" />
              }
              showSearch
              optionFilterProp="children"
              filterOption={filterOption}
              options={provinces.map((province) => ({
                value: province.code,
                label: province.full_name,
              }))}
            ></Select>
          </Form.Item>
          <Form.Item
            name={['address', 'district']}
            noStyle
            rules={[{ required: true, message: 'Hãy chọn Quận/Huyện' }]}
          >
            <Select
              placeholder="Quận/Huyện"
              onChange={handleChooseDistrict}
              showSearch
              optionFilterProp="children"
              filterOption={filterOption}
              options={districts.map((province) => ({
                value: province.code,
                label: province.full_name,
              }))}
              notFoundContent={
                isFetching ? (
                  <Spin />
                ) : (
                  <Empty description="Vui lòng chọn Thành phố/Tỉnh" />
                )
              }
            ></Select>
          </Form.Item>
          <Form.Item
            name={['address', 'ward']}
            noStyle
            rules={[{ required: true, message: 'Hãy chọn thành Phường/xã' }]}
          >
            <Select
              placeholder="Phường/Xã"
              showSearch
              optionFilterProp="children"
              filterOption={filterOption}
              options={wards.map((province) => ({
                value: province.code,
                label: province.full_name,
              }))}
              notFoundContent={
                isFetching ? (
                  <Spin />
                ) : (
                  <Empty description="Vui lòng chon Quận/Huyện" />
                )
              }
            ></Select>
          </Form.Item>
        </Space.Compact>
        <Form.Item
          name={['address', 'detail']}
          style={{ width: '100%', margin: '10px 0 0' }}
          rules={[{ required: true, message: 'Hãy nhập địa chỉ chi tiết' }]}
        >
          <Input.TextArea
            placeholder="Số nhà, tên đường, tên khu vực..."
            rows={2}
          />
        </Form.Item>
      </Form.Item>

      <style jsx global>{`
        .address-select-input {
          & > .ant-form-item {
            margin-bottom: 0;
          }
        }
        .ant-select-item-empty {
          padding: 10px 0;
          display: flex;
          justify-content: center;
        }
      `}</style>
    </div>
  );
}
