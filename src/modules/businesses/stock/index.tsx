"use client";
import { cn } from '@/lib/utils';
import DataTable from '@/modules/common/data-table';
import useDataTable from '@/modules/common/data-table/hook-data-table';
import { IProductStockModel } from '@/types/product-stock';
import { columnDefStock } from './column-def';

interface StockModuleProps {
    data: IProductStockModel[];
}
const StockModule = ({
    data
}: StockModuleProps) => {
    const { table } = useDataTable({
        data: data,
        columns: columnDefStock
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
                            by: "productName"
                        },
                        filterHeader: true,
                    }}
                    table={table}
                />
            </div>
        </div>
    );
};

export default StockModule;