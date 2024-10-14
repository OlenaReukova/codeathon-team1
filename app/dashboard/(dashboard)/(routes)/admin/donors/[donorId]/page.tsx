import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { LayoutDashboard, Map } from 'lucide-react';
import { IconBadge } from '@/components/icon-badge';
import { NameForm } from './_components/title-form';
import { EmailForm } from './_components/email-form';

const DonorIdPage = async ({ params }: { params: { donorId: string } }) => {
  const { userId } = auth();

  if (!userId) {
    return redirect('/');
  }

  const donor = {
    name: 'ram',
    email: 'ram@gmail.com',
    streetAddress: ' ',
    country: ' ',
    zipCode: ' ',
    city: ' ',
    state: ' ',
  };

  return (
    <>
      <div className='p-6'>
        <div className='flex items-center justify-between'>
          <div className='flex flex-col gap-y-2'>
            <h1 className='text-2xl font-medium'>Donor setup</h1>
            <span className='text-sm text-slate-700'></span>
          </div>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-16'>
          <div className='space-y-4'>
            <div>
              <div className='flex items-center gap-x-2'>
                <IconBadge icon={LayoutDashboard} />
                <h2 className='text-xl'>Customize donor details</h2>
              </div>
              <NameForm initialData={donor} donorId={params.donorId} />
              <EmailForm initialData={donor} donorId={params.donorId} />
            </div>
          </div>
          <div>
            <div className='flex items-center gap-x-2'>
              <IconBadge icon={Map} />
              <h2 className='text-xl'>Donor Address</h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DonorIdPage;
