'use client';

import { Card } from 'antd';
import { OGTabsTable, TabTable } from '@shopizer/organisms';
import { getSaleProductTableFilterForm } from '@shopizer/configs/meta/form/product-filter';
import { saleProductTabTable } from '@shopizer/configs/meta/table';

export function OGProduct() {
  const saleViolationData = [
    {
      key: '1',
      product: 'product',
      sku: 'product-sku',
      price: 1000000000,
      stock: 1000000000,
      salesCount: 1000000000,
    },
    {
      key: '2',
      product: {
        name: 'product',
        image: 'https://picsum.photos/200',
      },
      sku: 'product-sku',
      price: 1000000000,
      stock: 1000000000,
      salesCount: 1000000000,
    },
    {
      key: '3',
      product: 'product',
      sku: 'product-sku',
      price: 1000000000,
      stock: 1000000000,
      salesCount: 1000000000,
    },
  ];
  return (
    <>
      <Card style={{ width: '100%' }} className="sales-dashboard">
        <OGTabsTable
          tabKeyParamName={'list'}
          filterForm={getSaleProductTableFilterForm}
          tabs={saleProductTabTable}
        />
      </Card>
    </>
  );
}
