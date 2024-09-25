'use client';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useStoreModal } from '@/lib/hooks/stores/store-modal';
import { StoreSchema, storeSchema } from '@/lib/schema/storeSchema';
import { createStore } from '@/lib/services/store.service';
import { report } from '@/lib/utils';
import { FormFieldCommon } from '@/modules/common/form-field';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const StoreForm = () => {
  const [loading, setLoading] = useState(false);
  const { closeModal } = useStoreModal();
  const form = useForm<StoreSchema>({
    resolver: zodResolver(storeSchema),
    defaultValues: {
      storeName: ""
    }
  });
  const handleSubmit = async (data: StoreSchema) => {
    setLoading(true);
    try {
      const id = await createStore(data);
      window.location.assign(`/businesses/${id}/menu`);
    } catch (error) {
      report(error);
    } finally {
      setLoading(false)
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="flex flex-col gap-5">
          <FormFieldCommon
            control={form.control}
            disabled={loading}
            name="storeName"
            label='Store name'
            placeholder='E-commerce'
          />
          <div className='flex flex-row ml-auto gap-5'>
            <Button className='ml-auto ' disabled={loading} type="button" variant={"outline"} onClick={() => {
              closeModal();
            }}>Cancle</Button>
            <Button className='ml-auto' disabled={loading}>Save</Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default StoreForm;