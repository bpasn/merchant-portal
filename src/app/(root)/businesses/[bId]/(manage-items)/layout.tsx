import HeadingModule from '@/modules/common/heading-module';
import React from 'react';
import SwitchBranch from '../component/switch-branch';
import TabsClient from '../component/tabs-client';
import axiosClient from '@/lib/utils/axios-client';
import { redirect } from 'next/navigation';
import { StoreModal } from '@/lib/schema/storeSchema';

const layout =  async ({
  children
}: {
  children: React.ReactNode;
}) => {
  const { data } = await axiosClient.get<ApiResponse<StoreModal[]>>("/api/store/get-all");
  if (!data.payload.length) {
      redirect(`/businesses`);
  }
  return (
    <div className='flex flex-col'>
      <HeadingModule title="Manage items" />
      <div className='mb-5'>
        <SwitchBranch />
      </div>
      <TabsClient>
        {children}
      </TabsClient>
      <div className="mb-10"></div>
    </div>
  );
};

export default layout;