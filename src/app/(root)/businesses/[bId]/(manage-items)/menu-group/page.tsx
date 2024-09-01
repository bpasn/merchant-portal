import { ProductGroupSchema } from '@/lib/schema/productGroupSchema';
import axiosInstance from '@/lib/utils/axios-config';
import ManageItemGroupTemplate from '@/modules/businesses/manage-item-module/template/item-group';

interface MenuGroupPageProps {
  params: {
    bId: string;
  };
}
const MenuGroupPage = async ({
  params
}: MenuGroupPageProps) => {
  const { data } = await axiosInstance.get<ApiResponse<ProductGroupSchema[]>>("/api/group");
  return (
    <ManageItemGroupTemplate productGroups={data.payload} />
  );
};

export default MenuGroupPage;