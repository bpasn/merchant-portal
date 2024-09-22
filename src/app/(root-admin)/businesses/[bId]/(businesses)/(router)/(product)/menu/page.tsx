import { productGetAction } from "@/lib/services/manageItem.service";
import ManageItem from "@/modules/businesses/manage-item-module/template/product";

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