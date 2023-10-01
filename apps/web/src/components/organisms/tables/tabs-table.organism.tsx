'use client';

import { RequireOnlyOne } from '@shopizer/types/commons';
import { createQueryString } from '@shopizer/utils/data';
import { Table, Tabs } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

interface TabTableData<TableRecordType = any> {
  tabKey: string;
  tabHref: string;
  tabLabel: string;
  tableCol: ColumnsType<TableRecordType>;
  tableData: readonly TableRecordType[];
}

/**
 * @description Only one `tabHref` or `tabKey` field can be used in a tab
 */
export type TabTable = Array<
  RequireOnlyOne<TabTableData, 'tabHref' | 'tabKey'>
>;
/**
 *
 */
interface OGTabsTableProps {
  tabs: TabTable;
  activeTabKey?: string;
  onTabChange?: void;
  /**
   * This names the `tabKey` parameter on the url query parameters (default: `"tabKey"`).
   *
   * This is useful when there are multiple tab tables on the page
   */
  tabKeyParamName?: string;
}

export function OGTabsTable(props: OGTabsTableProps) {
  const router = useRouter();
  const routePathName = usePathname();
  const routeParams = useSearchParams();
  const [activeTabKey, setActiveTabKey] = useState<string>();
  const tabKeyParamName = props.tabKeyParamName ?? 'tabKey';
  const tabKeyParams = routeParams.getAll(tabKeyParamName);
  function onTabChange(key: string) {
    // TODO make loading state
    // if this tab has href, then redirect to that href for changing tab
    const matchTabKey = props.tabs.find((tab) => tab.tabKey === key);
    if (matchTabKey) {
      const pathWithParam = (matchTabKey as any)?.tabKey
        ? createQueryString(
            [{ name: tabKeyParamName, value: (matchTabKey as any)?.tabKey }],
            routeParams,
          )
        : '';
      router.push(`${routePathName}?${pathWithParam}`);
    } else if (props.tabs.find((tab) => tab.tabHref === key)) {
      router.push(key);
    } else {
      setActiveTabKey(key);
    }
  }

  useEffect(() => {
    const matchTabKey = props.tabs.find((tab) =>
      tabKeyParams.includes(tab.tabKey || ''),
    )?.tabKey;
    if (matchTabKey) {
      setActiveTabKey(matchTabKey);
      return;
    }
    const matchTabHref = props.tabs.find(
      (tab) => tab.tabHref === routePathName,
    )?.tabHref;
    if (matchTabHref) {
      setActiveTabKey(matchTabHref);
      return;
    }
  }, [tabKeyParams, routePathName, props.tabs]);

  return (
    <div className="wrapper">
      <Tabs
        type="card"
        className="ant-tabs"
        activeKey={activeTabKey}
        onChange={onTabChange}
        items={props.tabs.map((tab: any, i) => {
          return {
            label: tab.tabLabel,
            key: tab.tabHref || tab.tabKey || String(i + 1),
            children: (
              <Table
                columns={tab.tableCol}
                dataSource={tab.tableData}
                pagination={false}
              />
            ),
          };
        })}
      />

      <style jsx>{``}</style>
    </div>
  );
}
