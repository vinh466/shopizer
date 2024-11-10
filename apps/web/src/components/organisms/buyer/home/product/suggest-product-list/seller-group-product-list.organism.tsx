'use client';

import { Card, Col, Rate, Row } from 'antd';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { MSellerCard, OGProductCard, OGProductSellerGroup } from '@shopizer/molecules';
import { productApi } from '@shopizer/apis/product/product';

interface OGSellerGroupProductListProps {
  loading?: boolean;
}

export function OGSellerGroupProductList(props: OGSellerGroupProductListProps) {
  const [loading, setLoading] = useState(true);
  const [sellerGroupProducts, setSellerGroupProducts] = useState<any>([]);
  function getProducts() {
    productApi.getList({ type: 'seller-group' }).then((res) => {
      console.log(res);
      setSellerGroupProducts(res.results || []);
      setLoading(false);
    });
  }
  useEffect(() => {
    getProducts();
  }, []);
  return (
    <div>
        {sellerGroupProducts?.map((seller:any,index:number)=>{
           return <OGProductSellerGroup key={index} seller={seller} loading={loading} />;
        })}

      <style jsx global>{``}</style>
    </div>
  );
}
