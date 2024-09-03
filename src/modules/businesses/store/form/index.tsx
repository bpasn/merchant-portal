'use client';
import React, { useState } from 'react';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { StoreModal, StoreSchema, storeSchema } from '@/lib/schema/storeSchema';
import { FormFieldCommon } from '@/modules/common/form-field';
import { Button } from '@/components/ui/button';
import { useStoreModal } from '@/lib/hooks/store-modal';
import { useRouter } from 'next/navigation';
import { report } from '@/lib/utils';
import axiosClient from '@/lib/utils/axios-client';

const StoreForm = () => {
  const { closeModal } = useStoreModal();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const form = useForm<StoreSchema>({
    resolver: zodResolver(storeSchema),
    defaultValues: {
      storeName: ""
    }
  });
  const handleSubmit = async (data: StoreSchema) => {
    setLoading(true);
    try {
      const { data: store } = await axiosClient.post<ApiResponse<StoreModal>>('/api/store', data);
      window.location.assign(`/businesses/${store.payload.id}/menu`)
    } catch (error) {
      report(error);
    } finally {
      setLoading(false);
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
              window.location.assign('/')
            }}>Cancle</Button>
            <Button className='ml-auto' disabled={loading}>Save</Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default StoreForm;