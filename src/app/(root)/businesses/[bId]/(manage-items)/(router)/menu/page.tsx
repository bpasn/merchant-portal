import ManageItem from "@/modules/businesses/manage-item-module/template/item";
import { productGetAction } from "./action";

const MenuItemPage = async () => {
  const { payload: products } = await productGetAction(0, 10);
  return (
    <ManageItem dataTable={products} />
  );
};

export default MenuItemPage;