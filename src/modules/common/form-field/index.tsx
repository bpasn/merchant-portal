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
import { Control, ControllerRenderProps, FieldPath, FieldValues, Path } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export declare interface UseControllerProps<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
    name: TName,
    control?: Control<TFieldValues>,
    placeholder?: string;
    label?: string;
    type?: 'input' | 'textarea';
};


const FormFieldCommon = <T extends FieldValues,>({
    control,
    name,
    placeholder,
    label,
    type = "input"
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
                    <FormDescription />
                    <FormMessage className='mb-2' />
                </FormItem>
            )} />
    );
};
const renderElement = <T extends FieldValues,>(type: string, field: ControllerRenderProps<T, Path<T>> & { placeholder?: string; }): React.ReactNode => {
    if (type === 'input') {
        return (<Input {...field} className='rounded-lg' />);
    } else if (type === "textarea") {
        return (<Textarea {...field} className='rounded-lg'/>);
    }

};
export default FormFieldCommon;