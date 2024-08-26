'use client';
import { Button } from '@/components/ui/button';
import HeadingModule from '@/modules/common/heading-module';
import React from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from 'axios';
import {
  Form,
  FormField,

} from '@/components/ui/form';
import FormFieldCommon from '@/modules/common/form-field';
import _ from 'lodash';
import FileUpload from '../component/upload-image-form';

const formSchema = z.object({
  nameTH: z.string().min(1, "Name is required"),
  nameEN: z.string(),
  price: z.number().min(0, "Price must be greater than or equal to 0"),
  descriptionTH: z.string().nullable().optional(),
  descriptionEN: z.string().nullable().optional(),
  images: z.array(
    z.instanceof(File).refine(file => file.size <= 2 * 1024 * 1024, {
      message: "Image must be less than 2MB"
    })).min(0)
});

export type FormItemSchema = z.infer<typeof formSchema>;


interface CreateOrUpdateFromProps {
  dataForm: FormItemSchema | undefined;
};
const CreateOrUpdateFrom = ({
  dataForm
}: CreateOrUpdateFromProps) => {
  const title = dataForm !== undefined ? "Edit Item" : "Create Item";
  const form = useForm<FormItemSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: dataForm || {
      nameEN: "",
      nameTH: "",
      price: 0,
      images: []
    }
  });

  const handleSave = async (data: FormItemSchema) => {
    const formData = new FormData();
    formData.append("nameEN", data.nameEN);
    formData.append("nameTH", data.nameTH);
    formData.append("price", data.price.toString());
    data.images.map((e, index) => formData.append(`images[${index}]`, e));
    const response = await axios.post('/api/product', {
      body: formData,
    });
  
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSave)}>
          <HeadingModule title={title} >
            <Button
              className='rounded-lg'
              type='submit'
            >Save</Button>
          </HeadingModule>
          <div className="">
            <div className="content-container px-4 py-5 flex flex-col gap-10 col-span-7">
              <h2 className='font-bold text-md'>Item details</h2>
              <div className='flex flex-col gap-3 max-w-[500px]'>
                <p className='text-sm mb-2'>Item name</p>
                <div className="flex flex-col gap-1 ">
                  <FormFieldCommon
                    control={form.control}
                    name={"nameTH"}
                    placeholder='Thai name'
                  />
                  <FormFieldCommon
                    control={form.control}
                    name={"nameEN"}
                    placeholder='English name'
                  />
                </div>
              </div>

              <div className="w-[198px]">
                <p className='text-sm mb-2'>Price</p>
                <FormFieldCommon
                  name={'price'}
                  control={form.control}
                />
              </div>

              <div className='flex flex-col gap-3'>
                <p className='text-sm mb-2'>Description</p>
                <div className="flex flex-col gap-1">
                  <FormFieldCommon
                    type='textarea'
                    control={form.control}
                    name={"descriptionTH"}
                    placeholder='Thai description'
                  />
                  <FormFieldCommon
                    type='textarea'
                    control={form.control}
                    name={"descriptionEN"}
                    placeholder='English description'
                  />
                </div>
              </div>

              <div className='flex flex-col mx-0 gap-4'>
                <p className='text-sm mb-2'>image</p>
                <FormField
                  control={form.control}
                  name="images"
                  render={({ field }) => {
                    return (
                      <FileUpload
                        value={field.value?.map(file => (file as File))!}
                        onChange={(e: File) => {
                          let newFile: File = e;
                          if (field.value?.find(file => file === newFile)) {
                            return field.onChange(field.value);
                          }
                          field.value = [...field.value!, newFile];
                          return field.onChange(field.value);
                        }}
                      />
                    );
                  }} />
              </div>
            </div>
            {/* <div className='content-container sticky h-[350px] top-[100px] col-span-3 gap-4 basis-[300px] shrink-0'>
              <div className="p-6">
                <h4>Warning: Sale of regulated goods is not allowed</h4>
                <div>

                </div>
              </div>
            </div> */}
          </div>
        </form>
      </Form>
    </div >
  );
};

export default CreateOrUpdateFrom;