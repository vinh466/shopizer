import { MLoginForm } from '@shopizer/molecules';
import { useParams } from 'next/navigation';

function Page() {
  const { type, page } = useParams();
  return (
    <div className="sign-in">
      {type} {page}
      <MLoginForm />
    </div>
  );
}

export default Page;
