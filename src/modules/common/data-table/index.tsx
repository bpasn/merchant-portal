import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';
import { EachElement, ElementRenderWhen } from '@/lib/utils';
import {
    flexRender,
    RowData,
    Table as TableType
} from '@tanstack/react-table';
import React from 'react';
import FilterHeader from '../filter-header';

interface IOptionFilter<T> {
    filterHeader: boolean;
    customFilter?: React.ReactNode | null;
    sort?: {
        by: keyof T;
        placeHolderSort?: string;
    };
}

interface IDataTable<T extends RowData> {
    options?: IOptionFilter<T>;
    table: TableType<T>;
}

const DataTable = <T,>({
    // data,
    // columnsDef: columns,
    options,
    table
}: IDataTable<T>) => {

    return (
        <div className="w-full">
            <ElementRenderWhen _if={options?.filterHeader!} _el={null}>
                <ElementRenderWhen _if={options?.customFilter != null} _el={(
                    <FilterHeaderRender
                        table={table}
                        sortBy={options?.sort?.by}
                        placeHolderSort={options?.sort?.placeHolderSort}
                        onChange={(e) => table.getColumn(options?.sort?.by as string)?.setFilterValue(e.target.value)}                     
                     />
                )}>
                    {options?.customFilter}
                </ElementRenderWhen>
            </ElementRenderWhen>
            <div className="rounded-md border">
                <Table>
                    <TableHeader >
                        <EachElement
                            of={table.getHeaderGroups()}
                            render={(headerGroup) => {
                                return (
                                    <TableRow key={headerGroup.id}>
                                        <EachElement
                                            of={headerGroup.headers}
                                            render={(header) => {
                                                return (
                                                    <TableHead key={header.id} style={(header.column.columnDef.meta as any)?.style}
>
                                                        {header.isPlaceholder ? null : (
                                                            flexRender(
                                                                header.column.columnDef.header,
                                                                header.getContext()
                                                            )
                                                        )}
                                                    </TableHead>
                                                );
                                            }}
                                        />
                                    </TableRow>
                                );
                            }}
                        />
                    </TableHeader>
                    <TableBody >
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
                                            render={(cell) => {
                                                return (
                                                    <TableCell key={cell.id} >
                                                        {flexRender(
                                                            cell.column.columnDef.cell,
                                                            cell.getContext()
                                                        )}
                                                    </TableCell>
                                                );
                                            }}
                                        />
                                    </TableRow>
                                )}
                            />
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={table.getAllColumns().length}
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
const FilterHeaderRender = <T extends RowData,>({
    table, sortBy, placeHolderSort,onChange
}: {
    sortBy?: keyof T | null;
    placeHolderSort?: string;
    table: TableType<T>;
    onChange:(e:React.ChangeEvent<HTMLInputElement>) => void;
}) => {
    return (
        <FilterHeader
            sortBy={sortBy!}
            value={table.getColumn(sortBy!.toString())?.getFilterValue() as string}
            placeHolderSort={placeHolderSort}
            onChange={onChange}
            // renderDropdownContent={() => (
            //     <EachElement
            //         of={table.getAllColumns().filter(c => c.getCanHide())}
            //         render={(column) => (
            //             <DropdownMenuCheckboxItem
            //                 key={column.id}
            //                 className="capitalize"
            //                 checked={column.getIsVisible()}
            //                 onCheckedChange={(value) => column.toggleVisibility(!!value)}
            //             >
            //                 {column.id}
            //             </DropdownMenuCheckboxItem>
            //         )} />
            // )} 
            />
    );
};
export default DataTable;