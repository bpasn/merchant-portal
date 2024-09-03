import { CategoriesSchema } from '@/lib/schema/categoriesSchema';
import { ProductOptionSchema } from '@/lib/schema/ProductOptionSchema';
import axiosClient from '@/lib/utils/axios-client';
import FormItemMenu from '@/modules/businesses/manage-item-module/template/item/form/form-item';

const MenuItemPage = async () => {
    const { data: options } = await axiosClient.get<ApiResponse<ProductOptionSchema[]>>(`/api/option`);
    const { data: groups } = await axiosClient.get<ApiResponse<CategoriesSchema[]>>(`/api/group`);
    return (
        <FormItemMenu dataForm={undefined} productOptions={options.payload} productGroups={groups.payload} />
    );
};

export default MenuItemPage;