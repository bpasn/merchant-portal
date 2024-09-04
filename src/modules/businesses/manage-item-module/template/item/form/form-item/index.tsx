'use client';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { ToastAction } from '@/components/ui/toast';
import { useToast } from '@/components/ui/use-toast';
import { CategoriesSchema } from '@/lib/schema/categoriesSchema';
import { ProductOptionSchema } from '@/lib/schema/ProductOptionSchema';
import { productSchema, ProductSchema } from '@/lib/schema/productSchema';
import { EachElement } from '@/lib/utils';
import FileUpload from '@/modules/businesses/manage-item-module/component/upload-image-form';
import { FormFieldCommon } from '@/modules/common/form-field';
import HeadingModule from '@/modules/common/heading-module';
import LinkButton from '@/modules/common/link-button';
import { zodResolver } from "@hookform/resolvers/zod";
import { omit } from 'lodash';
import { useForm } from "react-hook-form";
import OptionFormComponent from '../component/option-form-component';
import StockFormComponent from '../component/stock-form-component';
import { useBranchStore } from '@/lib/hooks/store-branch';
import axiosClient from '@/lib/utils/axios-client';



interface FormItemMenuProps {
    dataForm: ProductSchema | undefined;
    productOptions: Omit<ProductOptionSchema, "choice">[];
    productGroups: CategoriesSchema[];
};
const FormItemMenu = ({
    dataForm,
    productOptions,
    productGroups
}: FormItemMenuProps) => {
    const branchContext = useBranchStore();
    const title = dataForm !== undefined ? "Edit Item" : "Create Item";
    const { toast } = useToast();

    const form = useForm<ProductSchema>({
        resolver: zodResolver(productSchema),
        defaultValues: dataForm || {
            nameEN: "",
            nameTH: "",
            price: 0,
            descriptionEN: "",
            descriptionTH: "",
            stock: {
                unitQuantity: 0,
                unitType: "PIECE",
                quantity: 0,
                status: "IN_STOCK",
                reOrder: false
            },
            images: [],
            productOptions: [],
            categories: []
        }
    });
    const handleSave = async (data: ProductSchema) => {
        console.log(data)
        try {
            const productsObject = omit(data, "images");
            const formData = new FormData();
            data.images.map((file) => {
                formData.append(`productImages`, file);
            });
            formData.append("nameTH", data.nameTH);
            formData.append("nameEN", data.nameEN);
            formData.append("descriptionTH", data.descriptionTH!);
            formData.append("descriptionEN", data.descriptionEN!);
            formData.append("stock.unitQuantity", data.stock.unitQuantity.toString());
            formData.append("stock.unitType", data.stock.unitType);
            formData.append("stock.quantity", data.stock.quantity.toString());
            formData.append("stock.status", data.stock.status);
            formData.append("stock.reOrder", Boolean(data.stock.reOrder).valueOf().toString());
            data.categories.map((c, i) => {
                formData.append(`categories[${i}].id`, c.id!);
            });
            data.productOptions.map((c, i) => {
                formData.append(`productOptions[${i}].id`, c.id!);
            })
            await axiosClient.post("/api/product", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
        } catch (error) {
            toast({ title: (error as Error).name, description: (error as Error).message });
        }

    };
    console.log(form.formState.errors);
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSave)} className='container'>
                <HeadingModule title={title} >
                    <Button
                        className='rounded-lg'
                        type='submit'
                    >Save</Button>
                </HeadingModule>
                <div className="flex flex-col gap-5">
                    <div className="content-container px-8 py-8 flex flex-col gap-10 col-span-7">
                        <h2 className='font-bold text-md'>Item details</h2>
                        <div className='flex flex-col gap-3 max-w-[500px]'>
                            <p className='text-sm mb-2'>Item name</p>
                            <div className="flex flex-col gap-2 ">
                                <FormFieldCommon
                                    control={form.control}
                                    name={"nameTH"}
                                    placeholder='Thai name'
                                />
                                <FormFieldCommon
                                    control={form.control}
                                    name={"nameEN"}
                                    placeholder='English name'
                                />
                            </div>
                        </div>

                        <div className="w-[198px]">
                            <p className='text-sm mb-2'>Price</p>
                            <FormFieldCommon
                                name={'price'}
                                control={form.control}
                            />
                        </div>

                        <div className='flex flex-col gap-3'>
                            <p className='text-sm mb-2'>Description</p>
                            <div className="flex flex-col gap-1">
                                <FormFieldCommon
                                    type='textarea'
                                    control={form.control}
                                    name={"descriptionTH"}
                                    placeholder='Thai description'
                                />
                                <FormFieldCommon
                                    type='textarea'
                                    control={form.control}
                                    name={"descriptionEN"}
                                    placeholder='English description'
                                />
                            </div>
                        </div>

                        <div className='flex flex-col mx-0 gap-4'>
                            <p className='text-sm mb-2'>image</p>
                            <FormField
                                control={form.control}
                                name="images"
                                render={({ field }) => (
                                    <FormItem>
                                        <FileUpload
                                            value={field.value?.map(file => (file as File))!}
                                            onChange={(e: File) => {
                                                let newFile: File = e;
                                                if (newFile.size >= 2 * 1024 * 1024) {
                                                    toast({
                                                        title: "Scheduled: Catch up ",
                                                        description: "Friday, February 10, 2023 at 5:57 PM",
                                                        action: (
                                                            <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
                                                        ),
                                                    });
                                                    return;
                                                }
                                                if (field.value?.find(file => file === newFile)) {
                                                    return field.onChange(field.value);
                                                }
                                                field.value = [...field.value!, newFile];
                                                return field.onChange(field.value);
                                            }}
                                        />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    <StockFormComponent stock={dataForm?.stock} control={form.control} />

                    <OptionFormComponent itemOption={productOptions} control={form.control} />
                    <div className="content-container px-8 py-8 flex flex-col gap-5 ">
                        <div className="flex flex-row items-center">
                            <h2 className='font-bold text-md'>Item Group</h2>
                            <div className="ml-auto">
                                <LinkButton className="border-none text-sm text-primary" href={`/businesses/${branchContext.id}/menu-group/create`} label="Create item groups" />
                            </div>
                        </div>
                        <div className="flex flex-col gap-3">
                            <EachElement
                                of={productGroups}
                                render={(group) => {
                                    return (
                                        <FormField
                                            control={form.control}
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
                                                                    console.log(updatedValue);
                                                                    field.onChange(updatedValue);
                                                                }}
                                                            />
                                                        </FormControl>
                                                        <FormLabel className="text-sm font-normal">
                                                            {group.name}
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
                    <div className='flex justify-end'>
                        <Button
                            className='rounded-lg  w-[250px]'
                            type='submit'
                        >Save</Button>
                    </div>
                </div>
            </form>
            <div className="mb-10" />
        </Form>
    );
};

export default FormItemMenu;