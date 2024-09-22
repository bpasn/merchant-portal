import HeadingModule from '@/modules/common/heading-module';
import React, { Suspense } from 'react';
import SwitchBranch from '../../component/switch-branch';
import TabsClient from '../../component/tabs-client';
import { getStoreById } from '@/lib/services/store.service';

const layout = async ({
  params,
  children
}: {
  params: {
    bId: string;
  };
  children: React.ReactNode;
}) => {
  await getStoreById(params.bId);
  return (
    <div className='flex flex-col'>
      <HeadingModule />
      <div className='mb-5'>
        <SwitchBranch />
      </div>
      <Suspense fallback={(
        <>Loading.....</>
      )}>
        {children}
      </Suspense>
      <div className="mb-10"></div>
    </div>
  );
};

export default layout;