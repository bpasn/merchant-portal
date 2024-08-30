'use client';
import { Checkbox } from '@/components/ui/checkbox';
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import useBranchContext from '@/lib/context/branch-context';
import { ProductOptionSchema } from '@/lib/schema/ProductOptionSchema';
import { ProductSchema } from '@/lib/schema/productSchema';
import { EachElement } from '@/lib/utils';
import LinkButton from '@/modules/common/link-button';
import React from 'react'
import { Control } from 'react-hook-form';

interface OptionFormComponentProps {
    itemOption: Omit<ProductOptionSchema, "choice">[];
    control: Control<ProductSchema>;

}

const OptionFormComponent = ({
    itemOption,
    control
}: OptionFormComponentProps) => {
    const branchContext = useBranchContext();
    return (
        <div className="content-container px-8 py-8 flex flex-col gap-5 ">
            <div className="flex flex-row">
                <h2 className='font-bold text-md'>Item options</h2>
                <div className="ml-auto">
                    <LinkButton className="border-none text-primary text-sm" href={`/bussinesses/${branchContext.id}/menu-option/create`} label="Create item option" />
                </div>
            </div>
            <div className="flex flex-col gap-3">
                <EachElement
                    of={itemOption}
                    render={(option) => {
                        return (
                            <FormField
                                control={control}
                                name={"itemOption"}
                                render={({ field }) => {
                                    const isChecked = Array.isArray(field.value) && field.value.some((value) => value.name === option.name);
                                    return (
                                        <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <Checkbox
                                                    checked={isChecked}
                                                    onCheckedChange={(c) => {
                                                        const currentValue = Array.isArray(field.value) ? field.value : [];
                                                        const updatedValue = c
                                                            ? [...currentValue, option]
                                                            : currentValue.filter((value) => value.name !== option.name);
                                                        field.onChange(updatedValue);
                                                    }}
                                                />
                                            </FormControl>
                                            <FormLabel className="text-sm font-normal">
                                                {option.name}
                                            </FormLabel>
                                        </FormItem>
                                    );
                                }}
                            />
                        );
                    }}
                />
            </div>
        </div>
    )
}

export default OptionFormComponent