import { ProductModal } from '@/lib/schema/productSchema';
import { categoryGetAction } from '@/lib/services/category.service';
import { getProductById } from '@/lib/services/product.service';
import { optionGetAction } from '@/lib/services/productOption.service';
import FormItemMenu from '@/modules/businesses/manage-item/template/product/form/form-item';

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