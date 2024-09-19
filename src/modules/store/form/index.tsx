'use client';
import React, { useState } from 'react';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { StoreSchema, storeSchema } from '@/lib/schema/storeSchema';
import { FormFieldCommon } from '@/modules/common/form-field';
import { Button } from '@/components/ui/button';
import { report } from '@/lib/utils';
import { useStoreModal } from '@/lib/hooks/stores/store-modal';
import useAxiosAuth from '@/lib/hooks/useAxiosAuth';
import { useSession } from 'next-auth/react';
import { createStore } from '@/lib/services/store.service';

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