import { categoryGetAction } from '@/lib/services/category.service';
import ManageItemGroupTemplate from '@/modules/businesses/manage-item/template/product-categories';

interface MenuGroupPageProps {
  params: {
    bId: string;
  };
}
const MenuGroupPage = async ({
  params: {
    bId
  }
}: MenuGroupPageProps) => {
  const data = await categoryGetAction(bId)
  return (
    <ManageItemGroupTemplate productGroups={data} />
  );
};

export default MenuGroupPage;