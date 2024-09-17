'use client';
import DataTable from '@/modules/common/data-table';
import React from 'react';
import LinkButton from '@/modules/common/link-button';
import { TabsContent } from '@/components/ui/tabs';
import { useParams } from 'next/navigation';
import { ProductModal } from '@/lib/schema/productSchema';
import { columnItems } from './column-data';

interface ManageItemProps {
    dataTable?: IDataTable<ProductModal> | null;
}
const ManageItem:React.FC<ManageItemProps> = ({
    dataTable
}) => {
    const params = useParams();
    return (
        <TabsContent value={`/businesses/${params.bId}/menu`}>
            <div className='p-4'>
                <DataTable
                    sortInputBy={"nameTH"}
                    data={dataTable?.content || []}
                    columnsDef={columnItems}
                    customHeader={(
                        <LinkButton label='Create item' href={`/businesses/${params.bId}/menu/create`} />
                    )}
                />
            </div>
        </TabsContent>
    );
};

export default ManageItem;