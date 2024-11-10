import { categoryApi } from '@shopizer/apis/category/category';
import { AImageFileInput } from '@shopizer/atoms';
import { CategorySelectInput } from '@shopizer/molecules';
import { Button, Col, Form, FormInstance, Input, Row, Select } from 'antd';
import { globalConfig } from 'antd/es/config-provider';
import { useEffect, useState } from 'react';

interface CommonAddProductFormProps {
  formControl?: FormInstance;
  initialValue?: any;
}

export function CommonProductForm(props: CommonAddProductFormProps) {
  const [categories, setCategories] = useState(props.initialValue || []);

  function getProducts() {
    const getSelectList = (list: any) => {
      return list.map((category: any) => {
        return {
          label: category.displayName,
          value: category.id,
          isDisable: category?.isProhibit,
          children: getSelectList(category.children),
        };
      }) as any;
    };
    categoryApi.getList({ tree: true }).then((res) => {
      setCategories(getSelectList(res));
    });
  }

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {}, [categories]);

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };

  return (
    <Form
      labelCol={{
        xs: { span: 24 },
        sm: { span: 4 },
      }}
      wrapperCol={{
        xs: { span: 24 },
        sm: { span: 20 },
      }}
      form={props.formControl}
      id="add-product-common-form"
      onFinish={onFinish}
      initialValues={{}}
      style={{ width: '100%' }}
      scrollToFirstError
    >
      <Form.Item
        name="name"
        label="Tên sản phẩm"
        rules={[
          {
            required: true,
            message: 'Hãy nhập tên sản phẩm!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="category"
        label="Danh mục"
        rules={[
          {
            required: true,
            message: 'Hãy chọn danh mục!',
          },
        ]}
      >
        <CategorySelectInput treeList={categories} />
      </Form.Item>

      <Form.Item
        name="description"
        label="Mô tả sản phẩm"
        rules={[
          {
            required: true,
            message: 'Hãy nhập mô tả sản phẩm!',
          },
        ]}
      >
        <Input.TextArea showCount maxLength={200} rows={4} />
      </Form.Item>

      <Form.Item
        name="productImage"
        label="Ảnh sản phẩm"
        rules={[
          {
            required: true,
            message: 'Hãy cung cấp ảnh sản phẩm!',
          },
        ]}
      >
        <AImageFileInput apiEndpoint="/product/image/update" count={1} name='product'/>
      </Form.Item>
      <Form.Item name="productImageDesc" label="Ảnh mô tả sản phảm">
        <AImageFileInput apiEndpoint="/product/image/update" count={5} name='product'/>
      </Form.Item>
      <style jsx global>{`
        #add-product-common-form {
          .ant-col.ant-form-item-control.ant-col-sm-20 {
            max-width: 767px;
          }
        }
      `}</style>
    </Form>
  );
}
