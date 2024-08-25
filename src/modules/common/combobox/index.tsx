'use client';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import React, { useState } from 'react';
import { ChevronsUpDown, CheckIcon } from 'lucide-react';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';


interface ComboboxProps {
    size?: number;
};

const Combobox = ({
    size
}: ComboboxProps) => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState();
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    role="combobox"
                    aria-expanded={open}
                    className={`justify-between`}
                    style={{
                        width:`${size}px`
                    }}
                >
                    {value
                        ? [].find((framework: any) => framework.value === value)
                        : "Select framework..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className={`p-0`} 
            style={{
                        width:`${size}px`
                    }}>
                <Command>
                    <CommandInput placeholder="Search framework..." className="h-9" />
                    <CommandList>
                        <CommandEmpty>No framework found.</CommandEmpty>
                        <CommandGroup>
                            {[].map((framework: any) => (
                                <CommandItem
                                    key={framework.value}
                                    value={framework.value}
                                    onSelect={(currentValue: any) => {
                                        setValue(currentValue === value ? "" : currentValue);
                                        setOpen(false);
                                    }}
                                >
                                    {framework.label}
                                    <CheckIcon
                                        className={cn(
                                            "ml-auto h-4 w-4",
                                            value === framework.value ? "opacity-100" : "opacity-0"
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