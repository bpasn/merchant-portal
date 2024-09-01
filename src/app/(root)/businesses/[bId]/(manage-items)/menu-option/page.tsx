import { ProductOptionSchema } from '@/lib/schema/ProductOptionSchema';
import axiosInstance from '@/lib/utils/axios-config';
import ManageItemOptionTemplate from '@/modules/businesses/manage-item-module/template/item-option';

type Props = {}

const MenuOptionPage = async (props: Props) => {
  const { data } = await axiosInstance.get<ApiResponse<ProductOptionSchema[]>>("/api/option");

  return (
    <ManageItemOptionTemplate productOption={data.payload}/>
  )
}

export default MenuOptionPage