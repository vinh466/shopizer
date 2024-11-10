'use client';

import { Card } from 'antd';
import { OGTabsTable, TabTable } from '@shopizer/organisms';
import { getSaleProductTableFilterForm } from '@shopizer/configs/meta/form/product-filter';
import { saleProductTabTable } from '@shopizer/configs/meta/table';
import { orderTabTable } from '@shopizer/configs/meta/table/order-table';

export function OGOrder() {
  return (
    <>
      <Card style={{ width: '100%' }} className="sales-dashboard">
        <OGTabsTable
          tabKeyParamName={'list'}
          tabs={orderTabTable} 
        />
      </Card>
    </>
  );
}
