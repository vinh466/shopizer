'use client';
import { RecoilRoot } from 'recoil';
import { TThemeProvider } from './theme-provider.template.tsx';
import { TDevProvider } from './dev-provider.template';
import { StyledJsxRegistry } from './styled-jsx-registry';
import { StyledComponentsRegistry } from './styled-component-registry';
import { TLAuthGuard } from './auth.template.template';

export const TClientProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <RecoilRoot>
      <TLAuthGuard>
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
