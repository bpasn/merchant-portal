'use client';
import { Checkbox } from '@/components/ui/checkbox';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { CategoriesSchema } from '@/lib/schema/categoriesSchema';
import { ProductSchema } from '@/lib/schema/productSchema';
import { EachElement } from '@/lib/utils';
import LinkButton from '@/modules/common/link-button';
import { useParams } from 'next/navigation';
import { Control } from 'react-hook-form';

type CategoryFormComponentProps = {
    categories: CategoriesSchema[];
    control: Control<ProductSchema>
}

const CategoryFormComponent = ({
    categories,
    control
}: CategoryFormComponentProps) => {
    const params = useParams();
    return (
        <div className="content-container px-8 py-8 flex flex-col gap-5 ">
            <div className="flex flex-row items-center">
                <h2 className='font-bold text-md'>Item Group</h2>
                <div className="ml-auto">
                    <LinkButton className="border-none text-sm text-primary" href={`/businesses/${params.bId}/menu-group/create`} label="Create item groups" />
                </div>
            </div>
            <div className="flex flex-col gap-3">
                <EachElement
                    of={categories}
                    render={(category) => {
                        return (
                            <FormField
                                control={control}
                                name={"categories"}
                                render={({ field }) => {
                                    const isChecked = Array.isArray(field.value) && field.value.some((value) => value.name === category.name);
                                    return (
                                        <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <Checkbox
                                                    checked={isChecked}
                                                    onCheckedChange={(c) => {
                                                        const currentValue = Array.isArray(field.value) ? field.value : [];
                                                        console.log({currentValue})
                                                        const updatedValue = c
                                                            ? [...currentValue, category]
                                                            : currentValue.filter((value) => value.name !== category.name);
                                                        field.onChange(updatedValue);
                                                    }}
                                                />
                                            </FormControl>
                                            <FormLabel className="text-sm font-normal">
                                                {category.name}
                                            </FormLabel>
                                            <FormMessage/>
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

export default CategoryFormComponent