'use client';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import React, { useState } from 'react';
import { ChevronsUpDown, CheckIcon } from 'lucide-react';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import useBranchContext from '@/lib/context/branch-context';
import { useParams, useRouter } from 'next/navigation';

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>;
export interface IOptionCombobox {
    label: string;
    value: string;
}
interface ComboboxProps<T> extends PopoverTriggerProps {
    items: T[];
    size?: number;
    changeValue:(v:string) => void
};

const Combobox = <T extends IOptionCombobox,>({
    items,
    size,
    changeValue
}: ComboboxProps<T>) => {
    const [open, setOpen] = useState(false);
    const [value,setValue] = useState(items[0].value);
    
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    role="combobox"
                    aria-expanded={open}
                    className={`justify-between`}
                    style={{
                        width: `${size}px`
                    }}
                >
                    {items.find(e => e.value === value)?.label}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className={`p-0`}
                style={{
                    width: `${size}px`
                }}>
                <Command>
                    <CommandInput placeholder="Search framework..." className="h-9" />
                    <CommandList>
                        <CommandEmpty>No framework found.</CommandEmpty>
                        <CommandGroup >
                            {items.map((branch: IOptionCombobox) => (
                                <CommandItem
                                    key={branch.value}
                                    value={branch.label}
                                    onSelect={(v) => {
                                        setValue(v);
                                        changeValue?.(v)
                                        setOpen(!open)
                                    }}
                                >
                                    {branch.label}
                                    <CheckIcon
                                        className={cn(
                                            "ml-auto h-4 w-4",
                                            value === branch.value ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
};

export default Combobox;