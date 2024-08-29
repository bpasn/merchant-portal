import { ItemGroupSchema } from '@/lib/schema/itemGroupSchema';
import { ItemOptionSchema } from '@/lib/schema/itemOptionSchema';
import FormItemMenu from '@/modules/businesses/manage-item-module/template/item/form/form-item';
import axios from 'axios';

type Props = {};

const MenuItemPage = async () => {
    const { data: options } = await axios.get<ApiResponse<ItemOptionSchema[]>>("http://localhost:3000/api/option");
    const { data: groups } = await axios.get<ApiResponse<ItemGroupSchema[]>>("http://localhost:3000/api/group");
    return (
        <FormItemMenu dataForm={undefined} itemOption={options.payload} itemGroup={groups.payload} />
    );
};

export default MenuItemPage;