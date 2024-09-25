import { productGetAction } from "@/lib/services/product.service";
import ManageItem from "@/modules/businesses/manage-item/template/product";

const MenuItemPage = async ({ params }: {
  params: {
    bId: string;
  }
}) => {
  const products = await productGetAction(params.bId, 0, 10);
  return (
    <ManageItem dataTable={products.payload} />
  );
};

export default MenuItemPage;