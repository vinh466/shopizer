'use client';

import React from 'react';
import { createCache, extractStyle, StyleProvider } from '@ant-design/cssinjs';
import type Entity from '@ant-design/cssinjs/es/Cache';
import { useServerInsertedHTML } from 'next/navigation';
import { ConfigProvider } from 'antd';
import { antdDarkTheme, antdLightTheme } from '@shopizer/configs/theme.config';
import { useRecoilValue } from 'recoil';
import { themeState } from '@shopizer/stores';
import { useIsClientSide } from '@shopizer/hooks';

export const TThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const cache = React.useMemo<Entity>(() => createCache(), [createCache]);
  const themeType = useRecoilValue(themeState);
  const isClientSide = useIsClientSide();
  const theme = themeType === 'dark' ? antdDarkTheme : antdLightTheme;
  useServerInsertedHTML(() => (
    <style
      id="antd"
      dangerouslySetInnerHTML={{ __html: extractStyle(cache, true) }}
    />
  ));
  return (
    <StyleProvider cache={cache}>
      {isClientSide && (
        <ConfigProvider theme={theme}>{children}</ConfigProvider>
      )}
    </StyleProvider>
  );
};
