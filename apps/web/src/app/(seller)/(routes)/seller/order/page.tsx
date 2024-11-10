'use client';

import { OGOrder, OGProduct } from '@shopizer/organisms';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

interface SalesOrderPageProps {}

function SalesOrderPage({}: SalesOrderPageProps) {
  const router = useSearchParams();

  return <OGOrder />;
}

export default SalesOrderPage;
