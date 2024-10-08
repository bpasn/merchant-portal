'use client';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form';
import { ToastAction } from '@/components/ui/toast';
import { useToast } from '@/components/ui/use-toast';
import { CategoriesSchema } from '@/lib/schema/categoriesSchema';
import { ProductOptionSchema } from '@/lib/schema/ProductOptionSchema';
import { ProductModal, productSchema, ProductSchema } from '@/lib/schema/productSchema';
import FileUpload from '@/modules/businesses/manage-item-module/component/upload-image-form';
import { FormFieldCommon, FormTextareaCommon } from '@/modules/common/form-field';
import HeadingModule from '@/modules/common/heading-module';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import OptionFormComponent from '../component/option-form-component';
import StockFormComponent from '../component/stock-form-component';
import CategoryFormComponent from '../component/category-form-component';
import { useParams } from 'next/navigation';
import { createProduct, productImageDelete, updateProduct } from '@/lib/services/manageItem.service';
import { report } from '@/lib/utils';
import ObjectFile from '@/modules/businesses/manage-item-module/component/object-file';
import { useStoreProgress } from '@/lib/hooks/stores/store-progress';



interface FormItemMenuProps {
    product: ProductModal | null;
    productOptions: Omit<ProductOptionSchema, "choice">[];
    categories: CategoriesSchema[];
};
const FormItemMenu = ({
    product,
    productOptions,
    categories
}: FormItemMenuProps) => {
    const title = product !== null ? "Edit Item" : "Create Item";
    const params = useParams();
    const storeProgress = useStoreProgress();
    const { toast } = useToast();
    const form = useForm<ProductSchema>({
        resolver: zodResolver(productSchema),
        defaultValues: product || {
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
            productImages: [],
            productOptions: [],
            categories: []
        }
    });
    const handleSave = async (data: ProductSchema) => {
        storeProgress.inProgress();
        try {
            const formData = new FormData();
            data.productImages.map((file) => {
                if (file instanceof File) {
                    formData.append(`productImages`, file);
                }
            });
            formData.append("products.storeId", params.bId.toString());
            formData.append("products.nameTH", data.nameTH);
            formData.append("products.nameEN", data.nameEN);
            formData.append("products.price", data.price.toFixed(2).toString());
            formData.append("products.descriptionTH", data.descriptionTH!);
            formData.append("products.descriptionEN", data.descriptionEN!);
            formData.append("products.stock.unitQuantity", data.stock.unitQuantity.toString());
            formData.append("products.stock.unitType", data.stock.unitType);
            formData.append("products.stock.quantity", data.stock.quantity.toString());
            formData.append("products.stock.status", data.stock.status);
            formData.append("products.stock.reOrder", Boolean(data.stock.reOrder).valueOf().toString());
            data.categories.map((c, i) => {
                formData.append(`products.categories`, c.id!);
            });
            data.productOptions.map((c, i) => {
                formData.append(`products.productOptions`, c.id!);
            });
            if (product) {
                await updateProduct(formData, product.id);
            } else {
                await createProduct(formData);
            }
            window.location.assign(`/businesses/${params.bId}/menu`);
        } catch (error) {
            toast({ title: "ERROR", description: report(error), variant: "destructive", duration: 3 * 1000 });
        } finally {
            storeProgress.done();
        }

    };

    // React.useEffect(() => {
    //     const handleBeforeUnload = (e: BeforeUnloadEvent) => {
    //         e.preventDefault();
    //         e.returnValue = "NOT NOW";
    //     }

    //     window.addEventListener("beforeunload", handleBeforeUnload);

    //     return () => window.removeEventListener("beforeunload", handleBeforeUnload);
    // }, [])



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
                                <FormTextareaCommon
                                    control={form.control}
                                    name={"descriptionTH"}
                                    placeholder='Thai description'
                                />
                                <FormTextareaCommon
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
                                name="productImages"
                                render={({ field }) => (
                                    <FormItem>
                                        <FileUpload
                                            value={field.value?.map(file => (file as File))!}
                                            onDelete={async (id: string) => {
                                                try {
                                                    await productImageDelete(id);
                                                    if ((field.value.every(e => (e as ObjectFile).uri !== undefined))) {
                                                        field.onChange(field.value.filter(e => {
                                                            return (e as ObjectFile).id !== id;
                                                        }));
                                                    }
                                                } catch (error) {
                                                    toast({
                                                        title: "ERROR",
                                                        description: report(error),
                                                        duration: 3 * 1000
                                                    });
                                                }
                                            }}
                                            onChange={(e: File) => {
                                                let newFile: File = e;
                                                if (newFile.size >= 2 * 1024 * 1024) {
                                                    toast({
                                                        title: "File",
                                                        description: "File size must be a maximum of 2MB.",
                                                        variant: "destructive"
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

                    <StockFormComponent stock={product?.stock} control={form.control} />
                    <OptionFormComponent itemOption={productOptions} control={form.control} />
                    <CategoryFormComponent categories={categories} control={form.control} />

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