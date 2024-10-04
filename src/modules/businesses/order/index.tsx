"use client";
import { cn } from '@/lib/utils';
import DataTable from '@/modules/common/data-table';
import useDataTable from '@/modules/common/data-table/hook-data-table';
// import { IProductOrderModel } from '@/types/product-Order';
import { columnDefOrder } from './column-def';
import { Order } from '@/types/order';

interface OrderModuleProps {
    orders: Order[];
}
const OrderModule = ({
    orders
}: OrderModuleProps) => {
    const { table } = useDataTable({
        data: orders,
        columns: columnDefOrder
    });
    return (
        <div className={
            cn(
                "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                "mt-0 w-full bg-[rgb(255,255,255)] shadow-[rgba(0,0,0,.2)_1px_0px_2px_-1px_,rgba(0,0,0,.2)_-1px_0px_2px_-1px]",
                "rounded-bl-md rounded-br-md rounded-tr-md",
            )
        }>
            <div className='p-4'>
                <DataTable
                    options={{
                        sort: {
                            by: "id"
                        },
                        filterHeader: true,
                    }}
                    table={table}
                />
            </div>
        </div>
    );
};

export default OrderModule;