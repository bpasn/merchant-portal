import { ItemGroupSchema } from '@/lib/schema/itemGroupSchema';
import { ItemOptionSchema } from '@/lib/schema/itemOptionSchema';
import FormItemMenu from '@/modules/bussinesses/manage-item-module/template/item/form/form-item';
import axios from 'axios';
import React from 'react';

type Props = {};

const CreateOrUpdatePage = async () => {
  const { data: groups } = await axios.get<{payload:ItemGroupSchema[],status:number}>("http://localhost:3000/api/group");
  const { data: options } = await axios.get<{payload:Omit<ItemOptionSchema[],"choiceEffect">,status:number}>("http://localhost:3000/api/option");

  return (
    <FormItemMenu
      dataForm={undefined}
      itemOption={options.payload}
      itemGroup={groups.payload}
    />
  );
};

export default CreateOrUpdatePage;