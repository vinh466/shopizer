'use client';

import { fetcher } from '@shopizer/apis/fetcher';
import { Table, TablePaginationConfig } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { useMount } from 'react-use';
import useSWR from 'swr';
interface OGTableResourceProps {
  columns: any;
  apiEndpoint?: string;
  baseQuery?: string;
}
export function OGTableResource(props: OGTableResourceProps) {
  const [mounted, setMounted] = useState(false);
  const baseQuery = props.baseQuery || '';
  const [query, setQuery] = useState(
    (props.baseQuery ? props.baseQuery + '&' : '?') + 'currentPage=1',
  );
  const queryRef = useRef(query);
  const url = `${props.apiEndpoint || ''}`;
  const [cacheKey, setCacheKey] = useState(1);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [sorter, setSorter] = useState(null);
  const { data, mutate } = useSWR(
    mounted && query && url ? [cacheKey, url + query] : null,
    ([key, url]) => {
      return fetcher(url);
    },
  );

  function handlePaginationAndSorter(
    pagination: TablePaginationConfig,
    sorter: any,
  ) {
    setPagination((s) => ({ ...s, ...pagination }));
    setSorter(sorter);
    setQuery(
      (s) =>
        `${props.baseQuery ? props.baseQuery + '&' : '?'}currentPage=${
          pagination.current
        }&pageSize=${pagination.pageSize}${
          sorter ? `&sort=${sorter.columnKey}&order=${sorter.order}` : ''
        }`,
    );
  }
  useEffect(() => {
    console.log(data);
    const { pageSize, currentPage, total } = data || {};
    data &&
      setPagination((s) => ({
        ...s,
        pageSize,
        current: currentPage,
        total,
      }));
  }, [data]);
  useEffect(() => {
    const sub = PubSub.subscribe('reload_table', (msg, data) => {
      console.log('reload_table');
      mutate();
    });
    return () => {
      PubSub.unsubscribe(sub);
    };
  }, []);
  useMount(() => setMounted(true));
  return (
    <Table
      columns={props.columns}
      rowKey="id"
      dataSource={data?.results || []}
      onChange={(pagination, filter, sorter, { action }) => {
        handlePaginationAndSorter(pagination, sorter);
      }}
      pagination={{
        ...pagination,
      }}
    />
  );
}
