import { CategoriesSchema } from '@/lib/schema/categoriesSchema';
import axiosClient from '@/lib/utils/axios-client';
import ManageItemGroupTemplate from '@/modules/businesses/manage-item-module/template/item-group';

interface MenuGroupPageProps {
  params: {
    bId: string;
  };
}
const MenuGroupPage = async ({
}: MenuGroupPageProps) => {
  const { data } = await axiosClient.get<ApiResponse<CategoriesSchema[]>>("/api/categories");
  return (
    <ManageItemGroupTemplate productGroups={data.payload} />
  );
};

export default MenuGroupPage;