'use client';
import { Button } from '@/components/ui/button';
import HeadingModule from '@/modules/common/heading-module';
import React from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
    Form
} from '@/components/ui/form';
import { FormFieldCommon } from '@/modules/common/form-field';
import _ from 'lodash';
import { itemGroupSchema, ItemGroupSchema } from '@/lib/schema/itemGroupSchema';



interface FormMenuGroupProps {
    itemGroup: ItemGroupSchema | null;
};
const FormMenuGroup = ({
    itemGroup
}: FormMenuGroupProps) => {
    const title = itemGroup !== null ? "Edit Item" : "Create Item";
    const form = useForm<ItemGroupSchema>({
        resolver: zodResolver(itemGroupSchema),
        defaultValues: itemGroup || {
            name: ""
        }
    });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit((d) => { })} className='container '>
                <HeadingModule title={title} >
                    <Button
                        className='rounded-lg'
                        type='submit'
                    >Save</Button>
                </HeadingModule>
                <div className="flex flex-col gap-5">
                    <div className="content-container px-8 py-8 flex flex-col gap-10">
                        <div className='flex flex-col gap-10'>
                            <h2 className='font-bold text-md'>Item details</h2>
                            <div className='flex flex-col gap-3 max-w-[500px]'>
                                <p className='text-sm mb-2'>Item name</p>
                                <div className="flex flex-col gap-8 mb-5">
                                    <FormFieldCommon
                                        control={form.control}
                                        name={"name"}
                                        placeholder='Item group name'
                                        description={"e.g., Main Course, Dessert, Beverage"}
                                    />
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </form>
            <div className="mb-10" />
        </Form>
    );
};

export default FormMenuGroup;