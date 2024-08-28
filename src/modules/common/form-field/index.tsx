'use client';
import React from 'react';
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

export declare interface UseControllerProps<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
    name: TName,
    control?: Control<TFieldValues>,
    placeholder?: string;
    label?: string;
    type?: 'input' | 'textarea';
    description?: string | null;
};


export const FormFieldCommon = <T extends FieldValues,>({
    control,
    name,
    placeholder,
    label,
    type = "input",
    description
}: UseControllerProps<T>) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem >
                    {label ? <FormLabel>{label}</FormLabel> : null}
                    <FormControl>
                        {renderElement(type, { ...field, placeholder: placeholder || "Enter your " + field.name })}
                    </FormControl>
                    {description ? <FormDescription className='text-xs text-gray-500'>{description}</FormDescription> : null}
                    <FormMessage className='mb-2' />
                </FormItem>
            )} />
    );
};
// <FormField
                                    //     key={item.name}
                                    //     control={form.control}
                                    //     name="itemOption"
                                    //     render={({ field }) => {
                                    //         const isChecked = Array.isArray(field.value) && field.value.some((value) => value.name === item.name);
                                    //         return (
                                    //             <FormItem key={item.name} className="flex flex-row items-start space-x-3 space-y-0">
                                    //                 <FormControl>
                                    //                     <Checkbox
                                    //                         checked={isChecked}
                                    //                         onCheckedChange={(checked) => {
                                    //                             const currentValue = Array.isArray(field.value) ? field.value : [];
                                    //                             const updatedValue = checked
                                    //                                 ? [...currentValue, { name: item.name }]
                                    //                                 : currentValue.filter((value) => value.name !== item.name);
                                    //                             field.onChange(updatedValue);
                                    //                         }}
                                    //                     />
                                    //                 </FormControl>
                                    //                 <FormLabel className="text-sm font-normal">
                                    //                     {item.name}
                                    //                 </FormLabel>
                                    //             </FormItem>
                                    //         );
                                    //     }}
                                    // />
interface FormFieldCheckboxCommonProps<T extends FieldValues,TName extends FieldPath<T> = FieldPath<T>> extends UseControllerProps<T,TName> {
    checked: boolean;
    onCheckedChange?: (checkState: CheckedState,field: ControllerRenderProps<T, TName>) => void;
    id?: string;
    value?: string;
    label?: string;
}
export const FormFieldCheckboxCommon = <T extends FieldValues,TName extends FieldPath<T>>({
    label,
    checked,
    id,
    value,
    name,
    control,
    onCheckedChange,
}: FormFieldCheckboxCommonProps<T,TName>) => {
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
                                            updatedValue = field.value.filter((value:PathValue<T, TName>) => value !== id);
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
const renderElement = <T extends FieldValues,>(type: string, field: ControllerRenderProps<T, Path<T>> & { placeholder?: string; }): React.ReactNode => {
    if (type === 'input') {
        return (<Input {...field} className='rounded-lg' />);
    } else if (type === "textarea") {
        return (<Textarea {...field} className='rounded-lg' />);
    }

};
