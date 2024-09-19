'use client';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
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
import { useBranchStore } from '@/lib/hooks/stores/store-branch';
import { ChoiceStatusEnum, choiceStatusEnum, OptionChoiceSchema } from '@/lib/schema/optionChioceSchema';
import { ProductOptionSchema } from '@/lib/schema/ProductOptionSchema';
import { cn, EachElement, toUpperCase } from '@/lib/utils';
import LinkButton from '@/modules/common/link-button';
import { X } from 'lucide-react';
import { useParams } from 'next/navigation';
import React from 'react';


const ManageItemOption = ({
  productOption
}: {
  productOption: ProductOptionSchema[];
}) => {
  const params = useParams();
  const handleChange = (v: string, optionIndex: number, choiceIndex: number) => {
    productOption[optionIndex].choices[choiceIndex].status = v as ChoiceStatusEnum;
  };
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
              render={(option, optionIndex) => {
                return (
                  <AccordionItem key={option.optionName} value={option.optionName}>
                    <AccordionTrigger className='hover:bg-black/10 ease-in-out transition-all duration-300 px-5 rounded-sm'>{option.optionName}</AccordionTrigger>
                    <AccordionContent>
                      <div className="ml-5">
                        <EachElement
                          of={option.choices}
                          render={(choice, choiceIndex) => (
                            <div key={choiceIndex} className='flex flex-row gap-5 items-center border-b-2 border-b-gray-100 py-3 px-3'>
                              <div className="w-full">
                                <h1>{choice.name}</h1>
                              </div>
                              {renderSelectStatus(choice, handleChange, optionIndex, choiceIndex)}
                              <X size={32} className='cursor-pointer ' onClick={() => { }} />
                            </div>
                          )}
                        />
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                );
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
  choice: OptionChoiceSchema,
  handleChange: (v: string, optionIndex: number, choiceIndex: number) => void,
  optionIndex: number,
  choiceIndex: number) {
  return (
    <Select
      value={choice.status}
      onValueChange={(v) => handleChange(v, optionIndex, choiceIndex)}
    >
      <SelectTrigger className={cn(
        "w-[157px] h-[30px] rounded-lg flex flex-row gap-4 p-3 justify-center focus:ring-0",
        choice.status === choiceStatusEnum.Enum.available
          ? "text-[rgba(0,168,56)] bg-[rgba(0,168,56)]/30"
          : "text-[rgba(123,132,136)] bg-[rgba(123,132,136)]/30"
      )}>
        <SelectValue placeholder={choice.status} />
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
