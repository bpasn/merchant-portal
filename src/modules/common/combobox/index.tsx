'use client';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import React, { useState } from 'react';
import { ChevronsUpDown, CheckIcon, PlusCircle } from 'lucide-react';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { CommandSeparator } from 'cmdk';
import { useStoreModal } from '@/lib/hooks/store-modal';
import StoreForm from '@/modules/store/form';
import { useParams, useRouter } from 'next/navigation';

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>;
export interface IOptionCombobox {
    label: string;
    value: string;
}
interface ComboboxProps<T> extends PopoverTriggerProps {
    items: T[];
    size?: number;
    changeValue?: (v: string) => void;
};

const Combobox = <T extends IOptionCombobox,>({
    items,
    size
}: ComboboxProps<T>) => {
    const params = useParams();
    const router = useRouter();
    const currentStore = items.find((item) => item.value === params.bId);
    const [open, setOpen] = useState(false);
    const openModal = useStoreModal((state) => state.openModal);


    const onSelect = (v: IOptionCombobox) => {
        setOpen(false);
        router.push(`/businesses/${v.value}/menu`)
    }
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
                    {currentStore?.label}
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
                            {items.map((item: IOptionCombobox) => (
                                <CommandItem
                                    key={item.value}
                                    value={item.label}
                                    onSelect={() => onSelect(item)}
                                >
                                    {item.label}
                                    <CheckIcon
                                        className={cn(
                                            "ml-auto h-4 w-4",
                                            currentStore?.value === item.value ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                    <CommandSeparator />
                    <CommandList>
                        <CommandGroup>
                            <CommandItem
                                className='flex flex-row gap-2'
                                onSelect={() => {
                                    openModal(<StoreForm />, "Create item", {
                                        description: "Add a new store to manage item"
                                    });
                                }}
                            >
                                <PlusCircle className='ml-2 h-5 w-5' />
                                <span>Create store</span>
                            </CommandItem>
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
};

export default Combobox;