import { TContainer } from '@shopizer/templates';
import { Layout } from 'antd';
import React from 'react';

const { Footer } = Layout;

const footerStyle: React.CSSProperties = {
  padding: 0,
  minHeight: 80,
  minWidth: 'var(--max-width)',
};
export function OGMainLayoutFooter() {
  return (
    <Footer style={footerStyle}>
      <TContainer>MainLayoutFooter</TContainer>
    </Footer>
  );
}
