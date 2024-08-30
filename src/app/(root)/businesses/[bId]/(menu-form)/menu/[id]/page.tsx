import { ProductGroupSchema } from '@/lib/schema/productGroupSchema';
import { ProductOptionSchema } from '@/lib/schema/ProductOptionSchema';
import FormItemMenu from '@/modules/businesses/manage-item-module/template/item/form/form-item';
import axios from 'axios';

type Props = {};

const MenuItemPage = async () => {
    const { data: options } = await axios.get<ApiResponse<ProductOptionSchema[]>>("http://localhost:3000/api/option");
    const { data: groups } = await axios.get<ApiResponse<ProductGroupSchema[]>>("http://localhost:3000/api/group");
    return (
        <FormItemMenu dataForm={undefined} itemOption={options.payload} itemGroup={groups.payload} />
    );
};

export default MenuItemPage;