import { getOptionById } from '@/lib/services/manageItem.service';
import FormMenuOption from '@/modules/businesses/manage-item/template/product-option/form/form-menu-option';

const CreateOrUpdatePage = async ({
  params: {
    editId
  }
}: {
  params: {
    editId: string;
  }
}) => {
  const option = await getOptionById(editId);
  return (
    <FormMenuOption
      itemOption={option}
    />
  );
};

export default CreateOrUpdatePage;