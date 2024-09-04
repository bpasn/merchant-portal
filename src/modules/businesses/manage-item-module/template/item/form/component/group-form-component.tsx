'use client';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useBranchStore } from '@/lib/hooks/store-branch';
import { CategoriesSchema } from '@/lib/schema/categoriesSchema';
import { ProductSchema } from '@/lib/schema/productSchema';
import { EachElement } from '@/lib/utils';
import LinkButton from '@/modules/common/link-button';
import { Checkbox } from '@radix-ui/react-checkbox';
import { Control } from 'react-hook-form';

type GroupFormComponentProps = {
    itemGroup: CategoriesSchema[];
    control: Control<ProductSchema>
}

const GroupFormComponent = ({
    itemGroup,
    control
}: GroupFormComponentProps) => {
    const branchContext = useBranchStore();
    return (
        <div className="content-container px-8 py-8 flex flex-col gap-5 ">
            <div className="flex flex-row items-center">
                <h2 className='font-bold text-md'>Item Group</h2>
                <div className="ml-auto">
                    <LinkButton className="border-none text-sm text-primary" href={`/bussinesses/${branchContext.id}/menu-group/create`} label="Create item groups" />
                </div>
            </div>
            <div className="flex flex-col gap-3">
                <EachElement
                    of={itemGroup}
                    render={(group) => {
                        return (
                            <FormField
                                control={control}
                                name={"categories"}
                                render={({ field }) => {
                                    const isChecked = Array.isArray(field.value) && field.value.some((value) => value.name === group.name);
                                    return (
                                        <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <Checkbox
                                                    checked={isChecked}
                                                    onCheckedChange={(c) => {
                                                        const currentValue = Array.isArray(field.value) ? field.value : [];
                                                        const updatedValue = c
                                                            ? [...currentValue, group]
                                                            : currentValue.filter((value) => value.name !== group.name);
                                                            console.log({updatedValue})
                                                        field.onChange(updatedValue);
                                                    }}
                                                />
                                            </FormControl>
                                            <FormLabel className="text-sm font-normal">
                                                {group.name}
                                            </FormLabel>
                                            <FormMessage />
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

export default GroupFormComponent