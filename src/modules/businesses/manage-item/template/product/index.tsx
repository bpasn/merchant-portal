'use client';
import { TabsContent } from '@/components/ui/tabs';
import { ProductModal } from '@/lib/schema/productSchema';
import DataTable from '@/modules/common/data-table';
import useDataTable from '@/modules/common/data-table/hook-data-table';
import FilterHeader from '@/modules/common/filter-header';
import LinkButton from '@/modules/common/link-button';
import { useParams } from 'next/navigation';
import React from 'react';
import { columnItems } from './column-data';

interface ManageItemProps {
    dataTable?: IDataTable<ProductModal> | null;
}
const ManageItem: React.FC<ManageItemProps> = ({
    dataTable
}) => {
    const params = useParams();
    const { table } = useDataTable({
        data: dataTable?.content || [],
        columns: columnItems
    });
    return (
        <TabsContent value={`/businesses/${params.bId}/menu`}>
            <div className='p-4'>
                <DataTable
                    options={{
                        filterHeader: true,
                        customFilter: (
                            <FilterHeader
                                customHeader={(
                                    <LinkButton label={'Create item'} href={`/businesses/${params.bId}/menu/create`}/>
                                )}
                                value={table.getColumn("nameTH")?.getFilterValue() as string}
                                onChange={(e) => table.getColumn("nameTH")?.setFilterValue(e.target.value)}
                            />
                        ),
                        sort: {
                            by: "nameTH",
                            placeHolderSort: "Filter by name"
                        }
                    }}
                    table={table}
                />
            </div>
        </TabsContent>
    );
};

export default ManageItem;