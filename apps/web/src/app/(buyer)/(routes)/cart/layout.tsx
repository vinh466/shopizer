import { COMMON_PAGE } from '@shopizer/constants';
import { TLAuthGuard } from 'src/components/templates/providers/auth.template.template';

const SellerLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <TLAuthGuard authRequire authRedirect={COMMON_PAGE.SIGN_IN.PATH}>
      {children}
    </TLAuthGuard>
  );
};

export default SellerLayout;
