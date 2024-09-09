import { CategoriesSchema } from '@/lib/schema/categoriesSchema';
import { ProductOptionSchema } from '@/lib/schema/ProductOptionSchema';
import { ProductModal } from '@/lib/schema/productSchema';
import axiosClient from '@/lib/utils/axios-client';
import FormItemMenu from '@/modules/businesses/manage-item-module/template/item/form/form-item';

const MenuItemPage = async ({ params }: {
    params: {
        editId: string;
    };
}) => {
    const { data: product } = await axiosClient.get<ApiResponse<ProductModal>>(`/api/product/${params.editId}`);
    const { data: options } = await axiosClient.get<ApiResponse<ProductOptionSchema[]>>(`/api/option`);
    const { data: categories } = await axiosClient.get<ApiResponse<CategoriesSchema[]>>(`/api/categories`);
    return (
        <FormItemMenu product={product.payload} productOptions={options.payload} categories={categories.payload} />
    );
};

export default MenuItemPage;