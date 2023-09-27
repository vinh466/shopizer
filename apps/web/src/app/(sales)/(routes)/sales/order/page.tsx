'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

interface SalesOrderPageProps {}

function SalesOrderPage({}: SalesOrderPageProps) {
  const router = useSearchParams();

  return <div>Sales Order Page: {router.get('type')}</div>;
}

export default SalesOrderPage;
