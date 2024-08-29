'use client';
import DataTable from '@/modules/common/data-table';
import React from 'react';
import { columnItems } from '../../data-table/data-table-item';
import LinkButton from '@/modules/common/link-button';
import { TabsContent } from '@/components/ui/tabs';
import { useParams } from 'next/navigation';

const ManageItem = () => {
    const params = useParams();
    return (
        <TabsContent value={`/businesses/${params.bId}/menu`}>
            <div className='p-4'>
                <DataTable
                    sortInputBy={"name"}
                    data={[{
                        name: "สามชั้นทอด",
                        itemGroup: "Recommended,หมู,กับข้าว,ของทอด",
                        price: 129.99
                    }]}
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