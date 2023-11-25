'use client';

import { productApi } from '@shopizer/apis/product/product';
import { BACKEND_PRODUCT_IMAGE_PATH, BACKEND_SELLER_IMAGE_PATH, SELLER_PRODUCT_PAGE } from '@shopizer/constants';
import {
  CommonProductForm,
  DetailsProductForm,
  SellDetailProductForm,
  SellerDeleteBtn,
} from '@shopizer/molecules';
import { Affix, Button, Col, Form, Row, Space, Spin, notification } from 'antd';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

function getCategory(
  categoryNested: { parent: any; displayName: string; id: string },
  isLeaf = true,
) {
  let parent = [] as any;
  if (categoryNested.parent) {
    parent = getCategory(categoryNested.parent, false);
  }
  return [
    ...parent,
    {
      value: categoryNested.id,
      label: categoryNested.displayName,
      isLeaf,
    },
  ];
}
function getImageObject(image: string) {
  return {
    uid: image,
    name: image,
    status: 'done',
    url: BACKEND_PRODUCT_IMAGE_PATH+image,
  };
}

function EditProductPage() {
  const [commonForm] = Form.useForm();
  const [detailsForm] = Form.useForm();
  const [sellDetailsForm] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [cloneRes, setCloneRes] = useState({} as any);
  const [createdProduct, setCreatedProduct] = useState(false);
  const router = useRouter();
  const { id } = useParams();


  async function fetchData() {
    setLoading(true);
    productApi
      .getProduct(id as string)
      .then((res) => {
        if (!res.errorStatusCode) {
          console.log(res);
          setCloneRes(res);
          commonForm.setFieldsValue({
            name: res['name'],
            description: res['description'],
            category: getCategory(res['Category']),
            productImage: res['image'] ? [getImageObject(res.image)] : [],
            productImageDesc:
              res['imageDesc']?.map((image: string) => getImageObject(image)) ||
              [],
          });
          detailsForm.setFieldsValue({
            detailList: res['detailList'],
          });
          const modeListWithId = res['variationConfig']?.modelList || [];
          if (modeListWithId?.[0]?.length > 0) {
            modeListWithId.forEach((model: any, index1: number) => {
              model.forEach((element: any, index2: number) => {
                modeListWithId[index1][index2] = {
                  ...element,
                  id:
                    res?.['ProductVariant']?.[index1 * model.length + index2]
                      ?.id || undefined,
                };
              });
            });
          } else {
            modeListWithId.forEach((model: any, index1: number) => {
              modeListWithId[index1] = {
                ...model,
                id: res?.['ProductVariant']?.[index1]?.id || undefined,
              };
            });
          }
          console.log(modeListWithId);
          sellDetailsForm.setFieldsValue({
            price: res['variationConfig']?.price || null,
            stock: res['variationConfig']?.stock || null,
            modelList: res['variationConfig']?.modelList || [],
            tierVariation: res['variationConfig']?.tierVariation || [],
          });
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }
  useEffect(() => {
    fetchData();
  }, []);

  const handleEditProduct = async () => {
    try {
      setLoading(true);
      const forms = await Promise.all([
        commonForm.validateFields(),
        detailsForm.validateFields(),
        sellDetailsForm.validateFields(),
      ]);

      let formData = {} as any;
      forms.forEach((form) => {
        formData = { ...formData, ...form };
      });
      if (
        formData['price'] &&
        cloneRes?.ProductVariant?.[0].variationName == 'default'
      ) {
        formData['productVariantId'] = cloneRes?.ProductVariant?.[0].id;
      }
      console.log(formData);
      const result = await productApi.update(id as string, formData);
      if (!result.errorStatusCode) {
        // setCreatedProduct(true);
        notification.success({
          message: 'Thành công',
          description: 'Đã cập nhập phẩm thành công',
        });
        // router.replace('/seller/product'); // TODO remove command code
      }
      setTimeout(()=>{
        setLoading(false);
        fetchData();
      },500)
    } catch (e) {
      setLoading(false);
      console.error(e);
    }
  };
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

          <SellDetailProductForm formControl={sellDetailsForm} isEdit/>
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
          justifyContent: 'space-between',
        }}
      >
        <Space>
          <SellerDeleteBtn
            productId={id as string}
            onloading={(l) => setLoading(l)}
            onSuccess={() => router.replace(SELLER_PRODUCT_PAGE.LIST.PATH)}
          />
        </Space>
        <Space>
          <Button loading={loading}>Hủy</Button>
          <Button
            type="primary"
            onClick={handleEditProduct}
            loading={loading}
            disabled={createdProduct}
          >
            Cập nhập
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

export default EditProductPage;
