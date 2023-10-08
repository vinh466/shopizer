'use client';
import { RecoilRoot } from 'recoil';
import { TThemeProvider } from './theme-provider.template.tsx';
import { TDevProvider } from './dev-provider.template';
import { StyledJsxRegistry } from './styled-jsx-registry';
import { StyledComponentsRegistry } from './styled-component-registry';

export const TClientProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <RecoilRoot>
      <StyledJsxRegistry>
        <StyledComponentsRegistry>
          <TThemeProvider>
            <TDevProvider>{children}</TDevProvider>
          </TThemeProvider>
        </StyledComponentsRegistry>
      </StyledJsxRegistry>
    </RecoilRoot>
  );
};
