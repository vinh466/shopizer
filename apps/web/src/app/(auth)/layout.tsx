'use client';
import { useTheme } from '@shopizer/hooks';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useTheme();
  return (
    <div className="auth-layout">
      {children}
      <style>{`
        .auth-layout {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background-color: ${theme === 'dark' ? '#010409' : '#ffffff'};
            background-image: url('${
              theme === 'dark' ? '/auth-bg-dark.png' : '/auth-bg.png'
            }');
            background-size: cover;
            background-position: bottom;
        } 
    `}</style>
    </div>
  );
};

export default AuthLayout;
