import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { ChevronDownIcon } from 'lucide-react';
import React from 'react';

interface FilterHeaderProps<T> {
    sortBy: keyof T;
    value: string;
    customHeader: React.ReactNode;
    onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    renderDropdownContent?: () => React.ReactNode;
}

const FilterHeader = <T,>({
    sortBy,
    customHeader,
    value,
    onInputChange,
    renderDropdownContent = () => null,
}: FilterHeaderProps<T>) => {
    return (
        <div className="overflow-auto py-4  ">
            <div className='flex gap-2 items-center min-w-[500px]'>
                <div className='min-w-[300px]'>
                    <Input
                        placeholder={`Filter ${sortBy.toString()}s...`}
                        value={value ?? ""}
                        onChange={onInputChange}
                    />
                </div>
                <div className='min-w-[250px]'>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild >
                            <Button variant="outline" className="ml-auto w-[250px]">
                                Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className='w-[250px]' >
                            {renderDropdownContent()}
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
    );
};

export default FilterHeader;