import { ProductModal } from '@/lib/schema/productSchema';
import { categoryGetAction, getProductById, optionGetAction } from '@/lib/services/manageItem.service';
import FormItemMenu from '@/modules/businesses/manage-item-module/template/product/form/form-item';

const MenuItemPage = async ({ params }: {
    params: {
        bId: string;
        editId: string;
    };
}) => {
    const product: ProductModal = await getProductById(params.editId);
    const categories = await categoryGetAction(params.bId);
    const option = await optionGetAction(params.bId);
    return (
        <FormItemMenu product={product} productOptions={option} categories={categories} />
    );
};

export default MenuItemPage;