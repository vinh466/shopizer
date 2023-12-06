import { Card } from "antd";
import { OGTabsTable } from "..";
import { orderTabTable } from "@shopizer/configs/meta/table/order-table";
import { manageSellerTabTable } from "@shopizer/configs/meta/table/admin-manage-seller";

export function OBSellerManage() {
    return (
      <>
        <Card style={{ width: '100%' }} className="sales-dashboard">
          <OGTabsTable tabKeyParamName={'list'} tabs={manageSellerTabTable} />
        </Card>
      </>
    );
}