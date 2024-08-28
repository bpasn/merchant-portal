'use client';
import { TabsContent } from '@/components/ui/tabs';
import useBranchContext from '@/lib/context/branch-context';
import React from 'react';
import ManageItemLayout from '../../manage-item-layout';
import { Input } from '@/components/ui/input';
import LinkButton from '@/modules/common/link-button';

type Props = {};

const ManageItemGroup = (props: Props) => {
  const { id } = useBranchContext();
  return (
    <ManageItemLayout>
      <TabsContent value={`/bussinesses/${id}/menu-group`}>
        <div className='p-4'>
          <div className="w-full">
            <div className="py-4 overflow-auto">
              <div className='flex gap-2 items-center min-w-[500px]'>
                <div className='min-w-[300px]'>
                  <Input
                    placeholder={`Filter option group...`}
                    value={""}
                    onChange={() => { }}
                  />
                </div>
                <div className='ml-auto' style={{
                  marginLeft: "auto"
                }}>
                  <LinkButton href={`/bussinesses/${id}/menu-group/create`} label='Create item group' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </TabsContent>
    </ManageItemLayout>
  );
};

export default ManageItemGroup;