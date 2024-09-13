import HeadingModule from '@/modules/common/heading-module';
import React from 'react';
import SwitchBranch from '../../component/switch-branch';
import TabsClient from '../../component/tabs-client';
import axiosClient from '@/lib/utils/axios-client';
import { StoreModal } from '@/lib/schema/storeSchema';
import { redirect } from 'next/navigation';
import { checkId } from '../action';
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
      <HeadingModule title="Manage items" />
      <div className='mb-5'>
        <SwitchBranch />
      </div>
      <TabsClient>{children}</TabsClient>
      <div className="mb-10"></div>
    </div>
  );
};

export default layout;