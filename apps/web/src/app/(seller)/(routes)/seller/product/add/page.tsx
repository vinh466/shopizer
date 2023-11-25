'use client';

import { productApi } from '@shopizer/apis/product/product';
import {
  CommonProductForm,
  DetailsProductForm,
  MProductCategoryFormItem,
  SellDetailProductForm,
} from '@shopizer/molecules';
import { Affix, Button, Col, Form, Row, Space, Spin, notification } from 'antd';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

function NewProductPage() {
  const [commonForm] = Form.useForm();
  const [detailsForm] = Form.useForm();
  const [sellDetailsForm] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [createdProduct, setCreatedProduct] = useState(false);
  const router = useRouter();

  const handleAddProduct = async () => {
    try {
      setLoading(true);
      const forms = await Promise.all([
        commonForm.validateFields(),
        detailsForm.validateFields(),
        sellDetailsForm.validateFields(),
      ]);

      let formData = {};
      forms.forEach((form) => {
        formData = { ...formData, ...form };
      });
      console.log(formData);
      const result = await productApi.create(formData);
      if (!result.errorStatusCode) {
        setCreatedProduct(true);
        notification.success({
          message: 'Thành công',
          description: 'Tạo sản phẩm thành công',
        });
        router.replace('/seller/product');
      }
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.error(e);
    }
  };
  // useEffect(() => {
  //   commonForm.setFieldsValue({
  //     name: 'Test product',
  //     description: 'Test description',
  //     sku: 'Test sku',
  //     price: 100000,
  //     quantity: 100,
  //     weight: 100,
  //     length: 100,
  //     width: 100,
  //     height: 100,
  //     productImage: [
  //       {
  //         uid: 'product-1699068162475-999682358.jpg',
  //         name: 'product-1699068162475-999682358.jpg',
  //         status: 'done',
  //         url: 'http://localhost:5000\\images\\products\\product-1699068162475-999682358.jpg',
  //       },
  //     ],
  //     category: [
  //       {
  //         value: 'ce9a7f5f-a79b-41fd-97ff-ce45c0ef5d7f',
  //         label: 'Thời Trang Nữ',
  //         isLeaf: false,
  //       },
  //       {
  //         value: 'f5b92919-ac95-440a-8009-698a4c6df37a',
  //         label: 'Áo',
  //         isLeaf: false,
  //       },
  //       {
  //         value: '55d794c7-2b30-4541-8b50-041ec7e7c861',
  //         label: 'Khác',
  //         isLeaf: true,
  //       },
  //     ],
  //   });
  // });
  return (
    <Row className="add-prooduct-page">
      <Col span={24} className="section">
        <Spin tip="Loading" spinning={loading}>
          <h2>Thông tin cơ bản</h2>

          <CommonProductForm formControl={commonForm} />
        </Spin>
      </Col>

      <Col span={24} className="section">
        <Spin tip="Loading" spinning={loading}>
          <h2>Thông tin chi tiết</h2>

          <DetailsProductForm formControl={detailsForm} />
        </Spin>
      </Col>

      <Col span={24} className="section" style={{ marginBottom: 64 }}>
        <Spin tip="Loading" spinning={loading}>
          <h2>Thông tin bán hàng</h2>

          <SellDetailProductForm formControl={sellDetailsForm} />
        </Spin>
      </Col>

      {/* <Col span={24} className="section">
        <h2>Vận chuyển</h2>
      </Col> */}

      <Col
        span={24}
        className="section submit-section"
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <Space>
          <Button onClick={handleAddProduct} loading={loading}>
            Hủy
          </Button>
          <Button
            type="primary"
            onClick={handleAddProduct}
            loading={loading}
            disabled={createdProduct}
          >
            Tạo sản phẩm
          </Button>
        </Space>
      </Col>

      <style jsx global>{`
        .price-input .ant-input-number-handler-wrap {
          display: none;
        }
        .ant-input-number {
          width: 100%;
          max-width: 190px;
        }
        .add-prooduct-page {
          .submit-section {
            position: fixed;
            bottom: 0;
            left: 220px;
            right: 20px;
            box-shadow: 2px 2px 10px #ccc;
            margin-bottom: 0 !important;
          }
          .section {
            margin-bottom: 16px;
            background-color: #fff;
            border-radius: 6px;
            padding: 16px;

            & h2 {
              margin: 0 0 20px;
              font-size: 20px;
              font-weight: 500;
              line-height: 22px;
              color: #333;
            }
          }
        }
      `}</style>
    </Row>
  );
}

export default NewProductPage;
