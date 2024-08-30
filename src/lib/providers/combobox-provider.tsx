'use client';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { FormControl } from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { ArrowUpDown, CheckIcon } from 'lucide-react';
import React, {  useEffect, useState } from 'react'

interface ComboboxProps {
    value: string, 
    label: string
}
interface ComboboxFormProvider {
    value: string;
    options: ComboboxProps[];
    onChange: (v: string) => void;
    placeholder?: string;
    isLoading?: boolean;
}


const ComboboxProvider = React.forwardRef<HTMLButtonElement, ComboboxFormProvider>(({
    value,
    options,
    onChange,
    placeholder,
}: ComboboxFormProvider, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <Popover onOpenChange={() => setIsOpen(!isOpen)} open={isOpen}>
            <FormControl>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={isOpen}
                        className="w-full justify-between"
                        ref={ref}
                    >
                        {value
                            ? options.find((option: ComboboxProps) => option.value === value)?.label
                            : placeholder || "Select input..."}
                        <ArrowUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
            </FormControl>
            <PopoverContent className="">
                <Command>
                    <CommandInput placeholder={placeholder} />
                    <CommandEmpty>No Input Found.</CommandEmpty>
                    <CommandGroup>
                        {options.map((option: ComboboxProps) => (
                            <CommandItem
                                className='cursor-pointer'
                                key={option.value}
                                value={option.value}
                                onSelect={(v) => {
                                    onChange(option.value === value ? value : option.value);
                                    setIsOpen(!isOpen)
                                }}
                            >
                                {option.value}
                                <CheckIcon
                                    className={cn(
                                        "ml-auto h-4 w-4",
                                        "value" === option.value ? "opacity-100" : "opacity-0"
                                    )}
                                />
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    )
})

export default ComboboxProvider