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
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable
} from '@tanstack/react-table';
import { EachElement } from '@/lib/utils';

interface IDataTable<T> {
    data: T[];
    columnsDef: ColumnDef<T>[];
}

const DataTable = <T,>({
data,
columnsDef
 }: IDataTable<T>) => {
    const table = useReactTable({
        data: data,
        columns: columnsDef,
        onSortingChange: () => { },
        onColumnFiltersChange: () => { },
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: () => { },
        onRowSelectionChange: () => { },
        state: {

        },

    });
    return (
        <div className="w-full">
            <div className="flex items-center py-4">
                Input
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
                                    colSpan={columnsDef.length}
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