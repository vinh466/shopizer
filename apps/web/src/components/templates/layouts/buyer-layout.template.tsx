'use client';

import { OGMainLayoutFooter, OGMainLayoutHeader } from '@shopizer/organisms';
import { Layout } from 'antd';
import React from 'react';
import { TContainer } from '..';

const { Content } = Layout;

const contentStyle: React.CSSProperties = {
  minHeight: 120,
  minWidth: 'var(--max-width)',
  marginTop: 16,
};

export function TMainLayout({ children }: { children: React.ReactNode }) {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <OGMainLayoutHeader />
      <Content style={contentStyle}>
        <TContainer>{children}</TContainer>
      </Content>
      {/* <OGMainLayoutFooter /> */}
    </Layout>
  );
}
