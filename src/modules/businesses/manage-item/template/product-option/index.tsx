'use client';
import {
  Accordion
} from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { TabsContent } from '@/components/ui/tabs';
import { ChoiceStatusEnum, choiceStatusEnum } from '@/lib/schema/optionChioceSchema';
import { ProductOptionSchema } from '@/lib/schema/ProductOptionSchema';
import { cn, EachElement, toUpperCase } from '@/lib/utils';
import LinkButton from '@/modules/common/link-button';
import { useParams } from 'next/navigation';
import React from 'react';
import OptionItem from './components/option-item';


const ManageItemOption = ({
  productOption
}: {
  productOption: ProductOptionSchema[];
}) => {
  const params = useParams();
  return (
    <TabsContent value={`/businesses/${params.bId}/menu-option`}>
      <div className='p-4'>
        <div className="w-full">
          <div className="py-4 overflow-auto">
            <div className='flex gap-2 items-center min-w-[500px]'>
              <div className='min-w-[300px]'>
                <Input
                  placeholder={`Filter option names...`}
                  value={""}
                  onChange={() => { }}
                />
              </div>
              <div className='ml-auto' style={{
                marginLeft: "auto"
              }}>
                <LinkButton href={`/businesses/${params.bId}/menu-option/create`} label='Create item option' />
              </div>
            </div>
          </div>
        </div>
        <Accordion type="single" collapsible className="w-full">
          {productOption.length ? (
            <EachElement
              of={productOption || []}
              render={(option) => {
                return <OptionItem {...option}/>;
              }}
            />
          ) : (
            <div className='flex items-center justify-center p-5'>
              No Results.
            </div>
          )}
        </Accordion>

      </div>
    </TabsContent>

  );
};

export default ManageItemOption;

export function renderSelectStatus(
  choice: ChoiceStatusEnum,
  setStatus: React.Dispatch<React.SetStateAction<ChoiceStatusEnum>>) {
  return (
    <Select
      value={choice}
      onValueChange={(v) => setStatus(v as ChoiceStatusEnum)}
    >
      <SelectTrigger className={cn(
        "w-[157px] h-[30px] rounded-lg flex flex-row gap-4 p-3 justify-center focus:ring-0",
        choice === choiceStatusEnum.Enum.available
          ? "text-[rgba(0,168,56)] bg-[rgba(0,168,56)]/30"
          : "text-[rgba(123,132,136)] bg-[rgba(123,132,136)]/30"
      )}>
        <SelectValue placeholder={choice} />
      </SelectTrigger>
      <SelectContent>
        <EachElement
          of={choiceStatusEnum.options}
          render={(status) => (
            <SelectItem key={status} value={status}>{toUpperCase(status)}</SelectItem>
          )} />
      </SelectContent>
    </Select>);
}
