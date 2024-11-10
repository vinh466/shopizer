"use client"

import { buyerOrderTabTable,  } from "@shopizer/configs/meta/table/order-table";
import { OGTabsTable } from "@shopizer/organisms";
import { Card } from "antd";

export default function OrderPage() {
  return (
    <div>
      <Card style={{ width: '100%' }} className="sales-dashboard">
        <OGTabsTable tabKeyParamName={'list'} tabs={buyerOrderTabTable} />
      </Card>
    </div>
  );
}