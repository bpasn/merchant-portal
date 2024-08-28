'use client';
import { Input } from '@/components/ui/input';
import { TabsContent } from '@/components/ui/tabs';
import useBranchContext from '@/lib/context/branch-context';
import LinkButton from '@/modules/common/link-button';
import React from 'react';
import ManageItemLayout from '../../manage-item-layout';

type Props = {};

const ManageItemOption = (props: Props) => {
  const { id } = useBranchContext();
  return (
    <ManageItemLayout>
      <TabsContent value={`/bussinesses/${id}/menu-option`}>
        <div className='p-4'>
          <div className="w-full">
            <div className="py-4 overflow-auto">
              <div className='flex gap-2 items-center min-w-[500px]'>
                <div className='min-w-[300px]'>
                  <Input
                    placeholder={`Filter option names...`}
                    value={""}
                    onChange={() => { }}
                  />
                </div>
                <div className='ml-auto' style={{
                  marginLeft: "auto"
                }}>
                  <LinkButton href={`/bussinesses/${id}/menu-option/create`} label='Create item option' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </TabsContent>
    </ManageItemLayout>
  );
};

export default ManageItemOption;