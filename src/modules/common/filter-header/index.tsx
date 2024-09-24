import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { ElementRenderWhen } from '@/lib/utils';
import { RowData, Table } from '@tanstack/react-table';
import { ChevronDownIcon } from 'lucide-react';
import React from 'react';

interface FilterHeaderProps<T extends RowData> {
    sortBy?: keyof T | null;
    placeHolderSort?: string;
    value: string;
    customHeader?: React.ReactNode;
    renderDropdownContent?: () => React.ReactNode;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FilterHeader = <T,>({
    sortBy,
    placeHolderSort = "Filter by " + sortBy?.toString(),
    customHeader,
    value = "",
    renderDropdownContent,
    onChange
}: FilterHeaderProps<T>) => {
    return (
        <div className="overflow-auto py-4  ">
            <div className='flex gap-2 items-center min-w-[500px]'>
                <div className='min-w-[300px]'>
                    <ElementRenderWhen _if={sortBy !== null || sortBy !== undefined} _el={null}>
                        <Input
                            placeholder={placeHolderSort}
                            value={value}
                            onChange={onChange}
                        />
                    </ElementRenderWhen>
                </div>
                <ElementRenderWhen _if={renderDropdownContent !== undefined} _el={null}>
                    <div className='min-w-[250px]'>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild >
                                <Button variant="outline" className="ml-auto w-[250px]">
                                    Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className='w-[250px]' >
                                {renderDropdownContent?.()}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </ElementRenderWhen>
                <div className='ml-auto' style={{
                    marginLeft: "auto"
                }}>
                    {customHeader}
                </div>
            </div>
        </div>
    );
};

export default FilterHeader;