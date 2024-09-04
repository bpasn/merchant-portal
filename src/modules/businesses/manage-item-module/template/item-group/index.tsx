'use client';
import { Input } from '@/components/ui/input';
import { TabsContent } from '@/components/ui/tabs';
import { CategoriesSchema } from '@/lib/schema/categoriesSchema';
import { EachElement } from '@/lib/utils';
import LinkButton from '@/modules/common/link-button';
import ProductGroupAction from './component/product-group-cell-action';
import { useParams } from 'next/navigation';


const ManageItemGroup = ({
  productGroups
}: {
  productGroups: CategoriesSchema[];
}) => {
  const params = useParams();
  const handleAction = () => {

  };
  return (
    <TabsContent value={`/businesses/${params.bId}/menu-group`}>
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
                <LinkButton href={`/businesses/${params.bId}/menu-group/create`} label='Create item group' />
              </div>
            </div>
          </div>
        </div>
        <EachElement
          of={productGroups}
          render={(group) => (
            <div className='flex flex-row px-2 py-4 border-b-2 items-center cursor-pointer hover:bg-primary-foreground/20'>
              <h2 className="text-md ">{group.name}</h2>
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