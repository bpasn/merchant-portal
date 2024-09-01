import { ProductGroupSchema } from '@/lib/schema/productGroupSchema';
import { ProductOptionSchema } from '@/lib/schema/ProductOptionSchema';
import axiosInstance from '@/lib/utils/axios-config';
import FormItemMenu from '@/modules/businesses/manage-item-module/template/item/form/form-item';

type Props = {};

const MenuItemPage = async () => {
    const { data: options } = await axiosInstance.get<ApiResponse<ProductOptionSchema[]>>(`/api/option`);
    const { data: groups } = await axiosInstance.get<ApiResponse<ProductGroupSchema[]>>(`/api/group`);
    return (
        <FormItemMenu dataForm={undefined} productOptions={options.payload} productGroups={groups.payload} />
    );
};

export default MenuItemPage;