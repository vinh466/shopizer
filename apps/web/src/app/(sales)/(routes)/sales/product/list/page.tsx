'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

interface SalesOrderPageProps {}

function SalesOrderPage({}: SalesOrderPageProps) {
  const router = useSearchParams();

  return <div>Product List Page: {router.get('type')}</div>;
}

export default SalesOrderPage;
