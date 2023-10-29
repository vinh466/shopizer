'use client';

import { Layout } from 'antd';
import React from 'react';

function layout({ children }: { children: React.ReactNode }) {
  return (
    <Layout hasSider>
      <Layout.Sider>Sider</Layout.Sider>
      <Layout.Content>{children}</Layout.Content>
    </Layout>
  );
}

export default layout;
