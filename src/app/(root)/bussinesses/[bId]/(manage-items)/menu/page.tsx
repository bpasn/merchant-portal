import { delay } from "@/lib/utils";
import ManageItemTemplate from "@/modules/bussinesses/manage-item-module/template/item";
const MenuItemPage = async () => {
  await delay(5 * 1000);
  return (
    <ManageItemTemplate />
  );
};

export default MenuItemPage;