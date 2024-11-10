'use client';

import { categoryApi } from '@shopizer/apis/category/category';
import { BACKEND_CATEGORY_IMAGE_PATH } from '@shopizer/constants';
import { Button, Skeleton, Typography } from 'antd';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

export function OGHomeCategory() {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  function getProducts() {
    categoryApi.getList({ tree: true }).then((res) => {
      console.log(res);
      setLoading(false);
      if (!res.errorStatusCode) {
        setCategories(res);
      }
    });
  }
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="category">
      <Typography.Title level={5} style={{ marginTop: 0 }}>
        Danh Mục
      </Typography.Title>
      {loading
        ? Array.from({ length: 10 }).map((_, index) => (
            <Skeleton.Button
              key={index}
              size="default"
              active
              shape={'default'}
              block
              style={{ marginBottom: 6 }}
            />
          ))
        : categories?.map((category: any) => (
            <Button
              key={category.id}
              className="category-item"
              title={category.displayName}
              type="text"
              // icon={
              //   <Image
              //     src={BACKEND_CATEGORY_IMAGE_PATH + category.image}
              //     alt="{category.image}"
              //     width="20"
              //     height="20"
              //   />
              // }
              href={`/category/${category.id}`}
            >
              {category.displayName}
            </Button>
          ))}

      <style jsx global>{`
        .category {
          background-color: #fff;
          padding: 8px;
          border-radius: 6px;

          .category-item {
            display: flex;
            width: 100%;
            padding: 4px 8px;

            overflow: hidden;
            & span {
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
          }
        }
      `}</style>
    </div>
  );
}
