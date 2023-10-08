'use client';

import { fetcher } from '@shopizer/apis/fetcher';
import { Table } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { useMount } from 'react-use';
import useSWR from 'swr';
interface OGTableResourceProps {
  columns: any;
  dataSource: any;
  apiEndpoint: string;
}
export function OGTableResource(props: OGTableResourceProps) {
  const [mounted, setMounted] = useState(false);
  const [query, setQuery] = useState('?page=1');
  const queryRef = useRef(query);
  const url = `${props.apiEndpoint}`;
  const [cacheKey, setCacheKey] = useState(null);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [sorter, setSorter] = useState(null);
  const { data } = useSWR(
    mounted && query ? [cacheKey, url + query] : null,
    ([key, url]) => {
      console.log(url);
      return fetcher(url);
    },
  );
  useEffect(() => {
    console.log(data);
  }, [data]);
  useMount(() => setMounted(true));
  return (
    <Table
      columns={props.columns}
      rowKey="id"
      dataSource={data?.results || []}
      pagination={false}
    />
  );
}
