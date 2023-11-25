'use client';
import { RecoilRoot, useRecoilState } from 'recoil';
import { TThemeProvider } from './theme-provider.template.tsx';
import { TDevProvider } from './dev-provider.template';
import { StyledJsxRegistry } from './styled-jsx-registry';
import { StyledComponentsRegistry } from './styled-component-registry';
import { TLAuthGuard } from './auth.template.template';
import { useEffect } from 'react';
import { sessionState } from '@shopizer/stores';
import { useRouter } from 'next/navigation';

export const TClientProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <RecoilRoot>
      <TLAuthGuard authRequire={false} root>
        <StyledJsxRegistry>
          <StyledComponentsRegistry>
            <TThemeProvider>
              <TDevProvider>{children}</TDevProvider>
            </TThemeProvider>
          </StyledComponentsRegistry>
        </StyledJsxRegistry>
      </TLAuthGuard>
    </RecoilRoot>
  );
};
