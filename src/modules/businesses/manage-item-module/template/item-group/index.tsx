'use client';
import { TabsContent } from '@/components/ui/tabs';
import useBranchContext from '@/lib/context/branch-context';
import React from 'react';
import { Input } from '@/components/ui/input';
import LinkButton from '@/modules/common/link-button';
import { EachElement } from '@/lib/utils';
import { ProductGroupSchema } from '@/lib/schema/productGroupSchema';
import { EllipsisVertical } from 'lucide-react';
import ProductGroupAction from './component/product-group-cell-action';


const ManageItemGroup = ({
  productGroups
}: {
  productGroups: ProductGroupSchema[];
}) => {
  const { id } = useBranchContext();
  const handleAction = () => {

  };
  return (
    <TabsContent value={`/businesses/${id}/menu-group`}>
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
                <LinkButton href={`/businesses/${id}/menu-group/create`} label='Create item group' />
              </div>
            </div>
          </div>
        </div>
        <EachElement
          of={productGroups}
          render={(group) => (
            <div className='flex flex-row px-2 py-4 border-b-2 items-center cursor-pointer hover:bg-primary-foreground/20'>
              <h2 className="text-md ">{group.groupName}</h2>
              <div className="ml-auto">
                <ProductGroupAction group={group} />
              </div>
            </div>
          )}
        />
      </div>
    </TabsContent>
  );
};

export default ManageItemGroup;