import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';
import React from 'react';
import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
    VisibilityState
} from '@tanstack/react-table';
import { EachElement } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { ChevronDownIcon, Plus } from 'lucide-react';
import Link from 'next/link';

interface IDataTable<T> {
    data: T[];
    columnsDef: ColumnDef<T>[];
    sortInputBy: keyof T;
    customHeader?:React.ReactNode
}

const DataTable = <T,>({
    data,
    sortInputBy,
    columnsDef:columns,
    customHeader
}: IDataTable<T>) => {
    const [sorting,setSorting] = React.useState<SortingState>([]);
    const [columnFilters,setColumnFilters] = React.useState<ColumnFiltersState>([])
    
    const[columnVisibility,setColumnVisibility] = React.useState<VisibilityState>({});
    const [rowSelection,setRowSelection] = React.useState({});
    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },

    });
    return (
        <div className="w-full">
            <div className="overflow-auto py-4  ">
                <div className='flex gap-2 items-center min-w-[500px]'>
                    <div className='min-w-[300px]'>
                        <Input
                            placeholder={`Filter ${sortInputBy.toString()}s...`}
                            value={(table.getColumn(sortInputBy.toString())?.getFilterValue() as string) ?? ""}
                            onChange={(event) =>
                                table.getColumn(sortInputBy.toString())?.setFilterValue(event.target.value)
                            }
                        />
                    </div>
                    <div className='min-w-[250px]'>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild >
                                <Button variant="outline" className="ml-auto w-[250px]">
                                    Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                {table
                                    .getAllColumns()
                                    .filter((column) => column.getCanHide())
                                    .map((column) => {
                                        return (
                                            <DropdownMenuCheckboxItem
                                                key={column.id}
                                                className="capitalize"
                                                checked={column.getIsVisible()}
                                                onCheckedChange={(value) =>
                                                    column.toggleVisibility(!!value)
                                                }
                                            >
                                                {column.id}
                                            </DropdownMenuCheckboxItem>
                                        );
                                    })}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <div className='ml-auto' style={{
                        marginLeft: "auto"
                    }}>
                        {customHeader}
                    </div>
                </div>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <EachElement
                            of={table.getHeaderGroups()}
                            render={(headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    <EachElement
                                        of={headerGroup.headers}
                                        render={(header) => (
                                            <TableHead key={header.id}>
                                                {header.isPlaceholder ? null : (
                                                    flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )
                                                )}
                                            </TableHead>
                                        )}
                                    />
                                </TableRow>
                            )}
                        />
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            <EachElement
                                of={table.getRowModel().rows}
                                render={(row) => (
                                    <TableRow
                                        key={row.id}
                                        data-state={row.getIsSelected() && "selected"}
                                    >
                                        <EachElement
                                            of={row.getVisibleCells()}
                                            render={(cell) => (
                                                <TableCell key={cell.id}>
                                                    {flexRender(
                                                        cell.column.columnDef.cell,
                                                        cell.getContext()
                                                    )}
                                                </TableCell>
                                            )}
                                        />
                                    </TableRow>
                                )}
                            />
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className='h-24 text-center'
                                >
                                    No Results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default DataTable;