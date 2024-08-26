'use client';
import DataTable from '@/modules/common/data-table';
import React from 'react';
import { columnItems } from '../../data-table/data-table-item';
import Link from 'next/link';
import { Plus } from 'lucide-react';

const ManageItem = () => {
    return (
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
                    <Link href="/manage-items/create" className=' rounded-xl text-[12px] p-2 flex flex-row gap-2 items-center border min-w-[120px]'>
                        <Plus size={14}/>
                        <span>Create item</span>
                    </Link>
                )}
            />
        </div>
    );
};

export default ManageItem;