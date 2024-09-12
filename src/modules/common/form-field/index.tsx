'use client';
import React, { useState } from 'react';
import {
    FormField,
    FormItem,
    FormControl,
    FormLabel,
    FormDescription,
    FormMessage
} from '@/components/ui/form';
import { Control, ControllerRenderProps, FieldPath, FieldValues, Path, PathValue } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { CheckedState } from '@radix-ui/react-checkbox';
import Combobox from '@/modules/common/combobox';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { CheckIcon, ChevronsUpDown } from 'lucide-react';
import { Command, CommandGroup, CommandItem, CommandList } from '@/components/ui/command';
import { cn } from '@/lib/utils';
export declare interface UseControllerProps<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
    name: TName,
    control?: Control<TFieldValues>,
    placeholder?: string;
    label?: string;
    type?: React.HTMLInputTypeAttribute;
    description?: string | null;
    disabled?: boolean;

};


export const FormFieldCommon = <T extends FieldValues,>({
    control,
    name,
    placeholder,
    label,
    description,
    type = "text",
    disabled,
}: UseControllerProps<T> ) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem >
                    {label ? <FormLabel>{label}</FormLabel> : null}
                    <FormControl>
                        <Input {...field}  type={type} placeholder={placeholder ? placeholder : "Enter your " + name} disabled={disabled} className='rounded-lg' />
                    </FormControl>
                    {description ? <FormDescription className='text-xs text-gray-500'>{description}</FormDescription> : null}
                    <FormMessage className='mb-2' />
                </FormItem>
            )} />
    );
};
export const FormTextareaCommon = <T extends FieldValues,>({
    control,
    name,
    placeholder,
    label,
    description,
    disabled
}: Omit<UseControllerProps<T>, "type">) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem >
                    {label ? <FormLabel>{label}</FormLabel> : null}
                    <FormControl>
                        <Textarea {...field} placeholder={placeholder ? placeholder : "Enter your " + name} disabled={disabled} className='rounded-lg' />
                    </FormControl>
                    {description ? <FormDescription className='text-xs text-gray-500'>{description}</FormDescription> : null}
                    <FormMessage className='mb-2' />
                </FormItem>
            )} />
    );
};

interface FormFieldCheckboxCommonProps<T extends FieldValues, TName extends FieldPath<T> = FieldPath<T>> extends UseControllerProps<T, TName> {
    checked: boolean;
    onCheckedChange?: (checkState: CheckedState, field: ControllerRenderProps<T, TName>) => void;
    id?: string;
    value?: string;
    label?: string;
}
export const FormFieldCheckboxCommon = <T extends FieldValues, TName extends FieldPath<T>>({
    label,
    checked,
    id,
    value,
    name,
    control,
    onCheckedChange,
}: FormFieldCheckboxCommonProps<T, TName>) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => {
                return (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                            <Checkbox
                                checked={checked}
                                onCheckedChange={(c) => {
                                    const isChecked = Boolean(c);
                                    let updatedValue = [];
                                    if (Array.isArray(field.value)) {
                                        if (isChecked) {
                                            updatedValue = [...field.value, id];
                                        } else {
                                            updatedValue = field.value.filter((value: PathValue<T, TName>) => value !== id);
                                        }
                                    } else {
                                        updatedValue = isChecked ? [id] : [];
                                    }

                                    field.onChange(updatedValue);

                                    if (onCheckedChange) {
                                        onCheckedChange(c, field);
                                    }
                                }}
                            />
                        </FormControl>
                        <FormLabel className="text-sm font-normal">
                            {label}
                        </FormLabel>
                    </FormItem>
                );
            }}
        />
    );
};

interface OptionSelectProps {
    value: string, label: string;
}
interface FormFieldSelectCommonProps<T extends FieldValues> extends UseControllerProps<T> {
    options: OptionSelectProps[];
    defaultValue?: string;
}

export const FormSelectCommon = <T extends FieldValues,>({
    control,
    name,
    label,
    options,
    defaultValue = options[0].value
}: FormFieldSelectCommonProps<T>) => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState<string>(defaultValue);
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => {
                return (
                    <FormItem className='flex flex-col gap-2 items-start'>
                        <FormLabel className="text-sm font-normal">
                            {label}
                        </FormLabel>
                        <FormControl>
                            <Popover open={open} onOpenChange={setOpen}>
                                <PopoverTrigger asChild className='m'>
                                    <Button
                                        variant={"outline"}
                                        role="combobox"
                                        aria-expanded={open}
                                        className={`justify-between w-full`}
                                    >
                                        {options.find(e => e.value === value)?.label}
                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className={`p-0 w-[250px]`}>
                                    <Command>
                                        {/* <CommandInput placeholder="Search framework..." className="h-9" /> */}
                                        <CommandList>
                                            <CommandGroup >
                                                {options.map((item: OptionSelectProps) => (
                                                    <CommandItem
                                                        key={item.value}
                                                        value={item.label}
                                                        onSelect={(v) => {
                                                            setValue(v);
                                                            field.onChange(v);
                                                            setOpen(!open);
                                                        }}
                                                    >
                                                        {item.label}
                                                        <CheckIcon
                                                            className={cn(
                                                                "ml-auto h-4 w-4",
                                                                value === item.value ? "opacity-100" : "opacity-0"
                                                            )}
                                                        />
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                        </FormControl>
                    </FormItem>
                );
            }}
        />
    );
};
const renderElement = <T extends FieldValues,>(
    type: string,
    field: ControllerRenderProps<T, Path<T>> & { placeholder?: string; disabled?: boolean; }): React.ReactNode => {
    if (type === 'input') {
        return (<Input {...field} className='rounded-lg' />);
    } else if (type === "textarea") {
        return (<Textarea {...field} className='rounded-lg' />);
    }

};
