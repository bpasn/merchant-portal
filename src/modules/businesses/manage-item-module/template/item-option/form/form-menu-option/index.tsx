'use client';
import { Button } from '@/components/ui/button';
import HeadingModule from '@/modules/common/heading-module';
import React from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,

} from '@/components/ui/form';
import {
    FormFieldCommon,
} from '@/modules/common/form-field';
import _ from 'lodash';
import { cn, EachElement, toUpperCase } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';
import { Minus, Plus, X } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import {
    Select,
    SelectItem,
    SelectContent,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import {
    ChoiceStatusEnum,
    choiceStatusEnum,
    OptionChoiceSchema
} from '@/lib/schema/optionChioceSchema';
import { useModalContext } from '@/lib/context/modal-context';
import FormChoice from '../form-choice';
import { productOptionSchema, ProductOptionSchema } from '@/lib/schema/ProductOptionSchema';



interface FormMenuOptionProps {
    itemOption: ProductOptionSchema | null;
};
const FormMenuOption = ({
    itemOption,
}: FormMenuOptionProps) => {
    const title = itemOption !== null ? "Edit Item" : "Create Item";
    const modalContext = useModalContext();
    const form = useForm<ProductOptionSchema & { lengthSelect?: number; }>({
        resolver: zodResolver(productOptionSchema),
        defaultValues: itemOption || {
            name: "",
            manyCanBeChosen: false,
            oneMustBeChosen: false,
            lengthSelect: 1,
            choice: []
        }
    });
    const { fields: fieldChoices, append, prepend, remove, swap, move, insert } = useFieldArray({ control: form.control, name: "choice" });

    const handleSubmitChoice = (data: OptionChoiceSchema) => {
        append(data)
        modalContext.closeModal();
    };
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit((d) => { })} className='container '>
                <HeadingModule title={title} >
                    <Button
                        className='rounded-lg'
                        type='submit'
                    >Save</Button>
                </HeadingModule>
                <div className="flex flex-col gap-5">
                    <div className="content-container px-8 py-8 flex flex-col gap-10">
                        <div className='flex flex-col gap-10'>
                            <h2 className='font-bold text-md'>Item details</h2>
                            <div className='flex flex-col gap-3 max-w-[500px]'>
                                <p className='text-sm mb-2'>Item name</p>
                                <div className="flex flex-col gap-8 mb-5">
                                    <FormFieldCommon
                                        control={form.control}
                                        name={"name"}
                                        placeholder='Item option name'
                                        description={"e.g., Sweetness, Size, Toppings"}
                                    />
                                    <FormField
                                        control={form.control}
                                        name={"oneMustBeChosen"}
                                        render={({ field }) => {
                                            return (
                                                <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                                                    <FormControl>
                                                        <Checkbox
                                                            checked={field.value}
                                                            onCheckedChange={(c) => {
                                                                field.onChange(c);
                                                            }}
                                                        />
                                                    </FormControl>
                                                    <FormLabel className="text-sm font-normal">
                                                        This option is required
                                                    </FormLabel>
                                                </FormItem>
                                            );
                                        }}
                                    />
                                    <FormField
                                        control={form.control}
                                        name={"manyCanBeChosen"}
                                        render={({ field }) => {
                                            return (
                                                <div className='flex flex-col gap-5'>
                                                    <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                                                        <FormControl>
                                                            <Checkbox
                                                                checked={field.value}
                                                                onCheckedChange={(c) => {
                                                                    if (!c) {
                                                                        form.setValue("lengthSelect", 1);
                                                                    }
                                                                    field.onChange(c);
                                                                }}
                                                            />
                                                        </FormControl>
                                                        <FormLabel className="text-sm font-normal">
                                                            Can select more than one choice
                                                        </FormLabel>
                                                    </FormItem>
                                                </div>
                                            );
                                        }}
                                    />
                                </div>
                                <div className={
                                    cn(
                                        "ml-10 ",
                                    )
                                }>
                                    <div className={
                                        `flex flex-row gap-5 items-center overflow-hidden transition-all duration-300 ease-in-out ${form.getValues("manyCanBeChosen") ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                        <h2 className="text-sm">Can select at most</h2>
                                        <div className="flex flex-row gap-5 items-center">
                                            <div className="rounded-full p-2 cursor-pointer bg-gray-300 text-center" onClick={() => {
                                                if (form.getValues("lengthSelect") === 1) {
                                                    return;
                                                }
                                                form.setValue("lengthSelect", form.getValues("lengthSelect") - 1);
                                            }}>
                                                <Minus className={`text-center ${form.getValues("lengthSelect") === 1 ? "disabled" : ""}`} size={14} />
                                            </div>
                                            <span>{form.watch("lengthSelect")}</span>
                                            <div className="rounded-full cursor-pointer p-2 bg-gray-300 text-center" onClick={() => {
                                                if (form.getValues("lengthSelect") >= form.getValues("choice").length) {
                                                    return;
                                                }
                                                form.setValue("lengthSelect", form.getValues("lengthSelect") + 1);
                                            }}>
                                                <Plus className={`text-center ${form.getValues("lengthSelect") >= form.getValues("choice").length ? "disabled" : ""}`} size={14} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Separator />
                        <div className='flex flex-col gap-10'>
                            <h2 className='font-bold text-md'>Choices</h2>

                            {fieldChoices.length ? (
                                <div className='flex flex-col w-full gap-5'>
                                    <EachElement
                                        of={fieldChoices}
                                        render={(choice, index) => (
                                            <div key={choice.id} className='flex flex-row gap-5 items-center'>
                                                <div className="w-full">
                                                    <FormFieldCommon
                                                        control={form.control}
                                                        name={`choice.${index}.name`}
                                                    />
                                                </div>
                                                <Select
                                                    value={form.watch(`choice.${index}.status`)}
                                                    onValueChange={v => form.setValue(`choice.${index}.status`, v as ChoiceStatusEnum)}
                                                >
                                                    <SelectTrigger className={
                                                        cn(
                                                            "w-[152px] h-[30px] rounded-lg flex flex-row gap-4 p-3 justify-center focus:ring-0",
                                                            form.watch(`choice.${index}.status`) === choiceStatusEnum.Enum.available
                                                                ? "text-[rgba(0,168,56)] bg-[rgba(0,168,56)]/30"
                                                                : "text-[rgba(123,132,136)] bg-[rgba(123,132,136)]/30"
                                                        )
                                                    }>
                                                        <SelectValue placeholder={choice.status} />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <EachElement
                                                            of={choiceStatusEnum.options}
                                                            render={(status) => (
                                                                <SelectItem key={status} value={status}>{toUpperCase(status)}</SelectItem>
                                                            )}
                                                        />
                                                    </SelectContent>
                                                </Select>
                                                <X size={32} className='cursor-pointer ' onClick={() => remove(index)} />
                                            </div>
                                        )}
                                    />
                                </div>
                            ) : null}
                            <Button
                                onClick={() => {
                                    modalContext.openModal(
                                        <FormChoice
                                            onSumbit={handleSubmitChoice} />,
                                        "Add Choice");
                                }}
                                type='button'
                                variant={"outline"}
                                className=' bg-primary/10 text-primary rounded-lg flex flex-row gap-2 w-[200px]'>
                                <Plus />
                                <span>Add choice</span>
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
            <div className="mb-10" />
        </Form>
    );
};

export default FormMenuOption;