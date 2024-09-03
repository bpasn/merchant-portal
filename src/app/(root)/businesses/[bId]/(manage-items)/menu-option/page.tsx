import { ProductOptionSchema } from '@/lib/schema/ProductOptionSchema';
import axiosClient from '@/lib/utils/axios-client';
import ManageItemOptionTemplate from '@/modules/businesses/manage-item-module/template/item-option';

type Props = {}

const MenuOptionPage = async (props: Props) => {
  const { data } = await axiosClient.get<ApiResponse<ProductOptionSchema[]>>("/api/option");

  return (
    <ManageItemOptionTemplate productOption={data.payload}/>
  )
}

export default MenuOptionPage