'use client';
import { RecoilRoot } from 'recoil';
import { TThemeProvider } from './theme-provider.template.tsx';
import { TDevProvider } from './dev-provider.template';
import { StyledJsxRegistry } from './styled-jsx-registry';

export const TClientProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <RecoilRoot>
      <StyledJsxRegistry>
        <TThemeProvider>
          <TDevProvider>{children}</TDevProvider>
        </TThemeProvider>
      </StyledJsxRegistry>
    </RecoilRoot>
  );
};
