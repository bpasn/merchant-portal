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
import { ProductGroupSchema, productGroupSchema } from '@/lib/schema/productGroupSchema';
import axiosInstance from '@/lib/utils/axios-config';
import { useRouter } from 'next/navigation';
import useBranchContext from '@/lib/context/branch-context';



interface FormMenuGroupProps {
    itemGroup: ProductGroupSchema | null;
};
const FormMenuGroup = ({
    itemGroup
}: FormMenuGroupProps) => {
    const title = itemGroup !== null ? "Edit Item" : "Create Item";
    const router = useRouter();
    const { id } = useBranchContext();
    const form = useForm<ProductGroupSchema>({
        resolver: zodResolver(productGroupSchema),
        defaultValues: itemGroup || {
            groupName: "",
            isRequired: false
        }
    });

    const handleSave = async (data: ProductGroupSchema) => {
        await axiosInstance.post("/api/group", data);
       return router.push(`/businesses/${id}/menu-group`);
    };
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSave)} className='container '>
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
                                        name={"groupName"}
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