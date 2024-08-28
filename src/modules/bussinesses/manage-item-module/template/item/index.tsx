'use client';
import DataTable from '@/modules/common/data-table';
import React, { Suspense } from 'react';
import { columnItems } from '../../data-table/data-table-item';
import LinkButton from '@/modules/common/link-button';
import useBranchContext from '@/lib/context/branch-context';
import { TabsContent } from '@/components/ui/tabs';
import ManageItemLayout from '../../manage-item-layout';

const ManageItem = () => {
    const { id } = useBranchContext();
    return (
        <ManageItemLayout>
            <Suspense fallback={<>Loading</>}>
                <TabsContent value={`/bussinesses/${id}/menu`} >
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
                                <LinkButton label='Create item' href={`/bussinesses/${id}/menu/create`} />
                            )}
                        />
                    </div>
                </TabsContent>
            </Suspense>
        </ManageItemLayout>
    );
};

export default ManageItem;