'use client';
import { Button } from '@/components/ui/button';
import {
    Form
} from '@/components/ui/form';
import { useBranchStore } from '@/lib/hooks/store-branch';
import { CategoriesSchema, categoriesSchema } from '@/lib/schema/categoriesSchema';
import axiosClient from '@/lib/utils/axios-client';
import { FormFieldCommon } from '@/modules/common/form-field';
import HeadingModule from '@/modules/common/heading-module';
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from 'next/navigation';
import { useForm } from "react-hook-form";



interface FormMenuGroupProps {
    itemGroup: CategoriesSchema | null;
};
const FormMenuGroup = ({
    itemGroup
}: FormMenuGroupProps) => {
    const title = itemGroup !== null ? "Edit Item" : "Create Item";
    const router = useRouter();
    const { id } = useBranchStore();
    const form = useForm<CategoriesSchema>({
        resolver: zodResolver(categoriesSchema),
        defaultValues: itemGroup || {
            groupName: "",
        }
    });

    const handleSave = async (data: CategoriesSchema) => {
        await axiosClient.post("/api/group", data);
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