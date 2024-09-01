import { ProductOptionSchema } from '@/lib/schema/ProductOptionSchema';
import axiosInstance from '@/lib/utils/axios-config';
import FormMenuOption from '@/modules/businesses/manage-item-module/template/item-option/form/form-menu-option';

const CreateOrUpdatePage = async () => {
  return (
    <FormMenuOption
      itemOption={null}
    />
  );
};

export default CreateOrUpdatePage;