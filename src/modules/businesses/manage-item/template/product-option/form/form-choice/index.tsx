'use client';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { choiceEffectEnum, optionChioceSchema, OptionChoiceSchema } from '@/lib/schema/optionChioceSchema';
import { EachElement, toUpperCase } from '@/lib/utils';
import { FormFieldCommon } from '@/modules/common/form-field';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { TbCurrencyBaht } from "react-icons/tb";

interface FormChoiceProps {
    onSumbit: (data: OptionChoiceSchema) => void;
}


const FormChoice = ({
    onSumbit
}: FormChoiceProps) => {
    const form = useForm<OptionChoiceSchema>({
        resolver: zodResolver(optionChioceSchema),
        defaultValues: {
            name: "",
            choiceEffect: "unchanged",
            price: 0,
            status: "available"
        }
    });
    return (
        <Form {...form}>
            <form className="flex flex-col gap-10" onSubmit={form.handleSubmit(onSumbit)}>
                <FormFieldCommon
                    control={form.control}
                    name="name"
                    placeholder='Choice name'
                    description={"How does his choice affect the item choice"}
                />
                <FormField
                    control={form.control}
                    name="choiceEffect"
                    render={({ field }) => (
                        <FormItem className="space-y-3">
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value?.toString()}
                                    className="flex flex-col space-y-5"
                                >
                                    <EachElement
                                        of={choiceEffectEnum.options}
                                        render={(effect) => {
                                            const isEffectSelected = field.value === 'increased' || field.value === 'decreased';
                                            return (
                                                <FormItem className="space-y-[0_!important] max-h-[90px] mt-[0_!important] flex flex-row items-center">
                                                    <div className="flex flex-row gap-2 py-2 ">
                                                        <FormControl className=''>
                                                            <RadioGroupItem value={effect} />
                                                        </FormControl>
                                                        <FormLabel className="font-normal">{toUpperCase(effect)}</FormLabel>
                                                    </div>
                                                    <div className={`flex flex-row w-full transition-all ease-in-out duration-505 ${isEffectSelected && effect === field.value ? "opacity-100" : "opacity-0"}`}>
                                                        {isEffectSelected && effect === field.value && (
                                                            <div className="flex flex-row ml-auto items-center border rounded-lg ">
                                                                <div className='flex flex-row items-center'>
                                                                    <TbCurrencyBaht className='' size={32} />
                                                                    <p>{effect === "decreased" ? "-" : "+"}</p>
                                                                </div>
                                                                <Input
                                                                    type="text"
                                                                    className="p-2 border-none h-8  rounded w-[90px]"
                                                                    placeholder={""}
                                                                    onChange={(e) => form.setValue("price", +e.target.value)}
                                                                />
                                                            </div>
                                                        )}
                                                    </div>
                                                </FormItem>
                                            );
                                        }}
                                    />
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button className='w-full rounded-lg' type='submit'>Save</Button>
            </form>
        </Form>
    );
};
export default FormChoice;