'use client';

import { OBSellerManage, OGOrder, OGProduct } from '@shopizer/organisms';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

interface AdminPageProps {}

function AdminPage({}: AdminPageProps) {
  const router = useSearchParams();

  return <OBSellerManage />;
}

export default AdminPage;
