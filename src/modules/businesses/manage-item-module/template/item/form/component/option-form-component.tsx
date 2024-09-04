'use client';
import { Checkbox } from '@/components/ui/checkbox';
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { useBranchStore } from '@/lib/hooks/store-branch';
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
    const branchContext = useBranchStore();
    return (
        <div className="content-container px-8 py-8 flex flex-col gap-5 ">
            <div className="flex flex-row">
                <h2 className='font-bold text-md'>Item options</h2>
                <div className="ml-auto">
                    <LinkButton className="border-none text-primary text-sm" href={`/businesses/${branchContext.id}/menu-option/create`} label="Create item option" />
                </div>
            </div>
            <div className="flex flex-col gap-3">
                <EachElement
                    of={itemOption}
                    render={(option) => {
                        return (
                            <FormField
                                control={control}
                                name={"productOptions"}
                                render={({ field }) => {
                                    const isChecked = Array.isArray(field.value) && field.value.some((value) => value.optionName === option.optionName);
                                    return (
                                        <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <Checkbox
                                                    checked={isChecked}
                                                    onCheckedChange={(c) => {
                                                        const currentValue = Array.isArray(field.value) ? field.value : [];
                                                        console.log({currentValue})
                                                        const updatedValue = c
                                                            ? [...currentValue, option]
                                                            : currentValue.filter((value) => value.optionName !== option.optionName);
                                                        field.onChange(updatedValue);
                                                    }}
                                                />
                                            </FormControl>
                                            <FormLabel className="text-sm font-normal">
                                                {option.optionName}
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