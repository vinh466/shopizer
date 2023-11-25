'use client';

import { Card } from 'antd';
import { OGTabsTable, TabTable } from '@shopizer/organisms';
import { getSaleProductTableFilterForm } from '@shopizer/configs/meta/form/product-filter';
import { saleProductTabTable } from '@shopizer/configs/meta/table';

export function OGProduct() {
  return (
    <>
      <Card style={{ width: '100%' }} className="sales-dashboard">
        <OGTabsTable
          tabKeyParamName={'list'}
          filterForm={getSaleProductTableFilterForm}
          tabs={saleProductTabTable}
          searchable
        />
      </Card>
    </>
  );
}
