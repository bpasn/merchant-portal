'use client';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
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
import DropdownAction from '@/modules/common/dropdown-action';
import LinkButton from '@/modules/common/link-button';
import { Edit2, EllipsisVertical, Trash, X } from 'lucide-react';
import { useParams } from 'next/navigation';
import React from 'react';
import { useState } from 'react';


const ManageItemOption = ({
  productOption
}: {
  productOption: ProductOptionSchema[];
}) => {
  const params = useParams();
  const [status, setStatus] = useState<ChoiceStatusEnum>(productOption[0].choices?.[0].status!);
  const handleChange = (v: string, optionIndex: number, choiceIndex: number) => {
    setStatus(v as ChoiceStatusEnum);
    // productOption[optionIndex].choices?.[choiceIndex].status = v as ChoiceStatusEnum;
  };

  const onEdit = () => {

  };

  const onDelete = () => {

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
                  <div className='flex flex-row gap-2 items-center'>
                    <AccordionItem className='flex-1 shrink-0 border-none' key={option.optionName} value={option.optionName!}>
                      <AccordionTrigger className='ml-auto  ease-in-out transition-all duration-300 px-5 rounded-sm'>
                        {option.optionName}
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="ml-5">
                          <EachElement
                            of={option.choices || []}
                            render={(choice, choiceIndex) => (
                              <div key={choiceIndex} className='flex flex-row gap-5 items-center  py-3 px-3'>
                                <div className="w-full">
                                  <h1>{choice.name}</h1>
                                </div>
                                {renderSelectStatus(status, handleChange, optionIndex, choiceIndex)}
                                <X size={32} className='cursor-pointer ' onClick={() => { }} />
                              </div>
                            )}
                          />
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    <div className="pr-5">
                      <DropdownAction
                        icon='EllipsisVertical'
                        buttonVariant="none"
                        onEdit={onEdit}
                        onDelete={onDelete} />
                    </div>
                  </div>
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
  choice: ChoiceStatusEnum,
  handleChange: (v: string, optionIndex: number, choiceIndex: number) => void,
  optionIndex: number,
  choiceIndex: number) {
  return (
    <Select
      value={choice}
      onValueChange={(v) => handleChange(v, optionIndex, choiceIndex)}
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
