import { TContainer } from '@shopizer/templates';
import { Layout } from 'antd';
import React from 'react';

const { Header } = Layout;

const headerStyle: React.CSSProperties = {
  minHeight: 64,
  padding: 0,
  minWidth: 'var(--max-width)',
};

export function OGMainLayoutHeader() {
  return (
    <Header style={headerStyle}>
      {/* <TContainer>
        HeaderHeaderHeaderHeaderHeaderHeaderHeaderHeaderHeaderHeaderHeaderHeaderHeaderHeaderHeaderHeaderHeaderHeaderHeaderHeaderHeaderHeaderHeaderHeaderHeaderHeaderHeaderHeaderHeaderHeaderHeaderHeaderHeaderHeaderHeaderHeaderHeaderHeaderHeaderHeaderHeaderHeaderHeaderHeaderHeaderHeader
        Header HeaderHeaderHeaderHeaderHeaderHeaderHeaderHeaderHeaderHeader
      </TContainer> */}
    </Header>
  );
}
