'use client';

import { FormMeta, RequireOnlyOne } from '@shopizer/types/commons';
import { createQueryString } from '@shopizer/utils/data';
import { Badge, Button, Collapse, Form, Input, Space, Table, Tabs } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { OGDrawerTableFilter } from './widgets/drawer-tabs-table-filter.organism';
import { OGTableResource } from './table-resource.organism';
interface TabTableData<TableRecordType = any> {
  /**
   * Using this field will cause the tab to self-manage tab switching. (replacement for tabKey, tabHref)
   */
  tabId: string;
  /**
   * Using this field will cause the tab manager to switch tabs via the url parameter (replacement for tabId, tabHref)
   *
   * Can be set parameter name via `tabKeyParamName` prop
   */
  tabKey: string;
  /**
   * Using this field will cause the tab manager to switch tabs via the url (replacement for tabId, tabHref)
   */
  tabHref: string;
  tabLabel: string;
  tableCol: ColumnsType<TableRecordType>;
  apiEndpoint?: string;
  baseQuery?: string;
  isAdminApi?: boolean;
}

/**
 * @description Only one in `tabHref`, `tabKey`, `tabId` field can be used in a tab
 */
export type TabTable = Array<
  RequireOnlyOne<TabTableData, 'tabHref' | 'tabKey' | 'tabId'>
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
  filterForm?: FormMeta;
  searchable?: boolean;
}

export function OGTabsTable(props: OGTabsTableProps) {
  const router = useRouter();
  const routePathName = usePathname();
  const routeParams = useSearchParams();
  const [activeTabKey, setActiveTabKey] = useState<string>();
  const [filter, setFilter] = useState(false);
  const [showFilter, setShowFilter] = useState<string[]>([]);
  const tabKeyParamName = props.tabKeyParamName ?? 'tabKey';
  const tabKeyParams = routeParams.getAll(tabKeyParamName);

  function onTabChange(key: string) {
    // TODO make loading state
    // if this tab has href, then redirect to that href for changing tab
    const matchTabKey = props.tabs.find((tab) => tab.tabKey === key);
    if (matchTabKey) {
      const pathWithParam = matchTabKey?.tabKey
        ? createQueryString(
            [{ name: tabKeyParamName, value: matchTabKey?.tabKey }],
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
    <div className="og-tabs-table-wrapper">
      <Tabs
        type="card"
        className="ant-tabs"
        activeKey={activeTabKey}
        tabBarExtraContent={
          <Space>
            {props.filterForm && (
              <OGDrawerTableFilter
                formName={'filter-form'}
                formMeta={props.filterForm}
              />
            )}
            {props.searchable && (
              <Input.Search
                placeholder="tìm kiếm"
                allowClear
                loading={false}
                onSearch={(searchString) => alert(searchString)}
                enterButton
              />
            )}
          </Space>
        }
        onChange={onTabChange}
        items={props.tabs?.map((tab, i) => {
          let key = tab.tabHref || tab.tabKey || tab.tabId || String(i + 1);
          // key += String(i + 1);
          return {
            label: tab.tabLabel,
            key,
            children: (
              <OGTableResource
                key={key}
                columns={tab.tableCol}
                apiEndpoint={tab.apiEndpoint}
                isAdminApi={tab.isAdminApi}
                baseQuery={tab.baseQuery || ''}
              />
            ),
          };
        }) ||[]}
      />
      <style jsx global>{`
        .og-tabs-table-wrapper {
        }
      `}</style>
    </div>
  );
}
