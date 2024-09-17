import { optionGetAction } from '@/lib/services/manageItem.service';
import ManageItemOptionTemplate from '@/modules/businesses/manage-item-module/template/product-option';


const MenuOptionPage = async ({
  params: {
    bId
  }
}: {
  params: {
    bId: string;
  }
}) => {
  const data = await optionGetAction(bId);
  return (
    <ManageItemOptionTemplate productOption={data} />
  )
}

export default MenuOptionPage