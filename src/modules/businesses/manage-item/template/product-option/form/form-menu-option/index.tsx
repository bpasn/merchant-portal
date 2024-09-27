'use client';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from '@/components/ui/form';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/components/ui/use-toast';
import { useStoreModal } from '@/lib/hooks/stores/store-modal';
import {
    ChoiceStatusEnum,
    choiceStatusEnum,
    OptionChoiceSchema
} from '@/lib/schema/optionChioceSchema';
import { productOptionSchema, ProductOptionSchema } from '@/lib/schema/ProductOptionSchema';
import { cn, EachElement, report, toUpperCase } from '@/lib/utils';
import {
    FormFieldCommon,
} from '@/modules/common/form-field';
import HeadingModule from '@/modules/common/heading-module';
import { zodResolver } from "@hookform/resolvers/zod";
import { Minus, Plus, X } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useFieldArray, useForm } from "react-hook-form";
import FormChoice from '../form-choice';
import { createProductOption } from '@/lib/services/productOption.service';
import { useEffect } from 'react';
import { useStoreHead } from '@/lib/hooks/stores/store-head';



interface FormMenuOptionProps {
    itemOption: ProductOptionSchema | null;
};
const FormMenuOption = ({

    itemOption,
}: FormMenuOptionProps) => {
    const title = itemOption !== null ? "Edit Item" : "Create Item";
    const params = useParams();
    const modalContext = useStoreModal();
    const { setTitle } = useStoreHead();
    const form = useForm<ProductOptionSchema & { lengthSelect?: number; }>({
        resolver: zodResolver(productOptionSchema),
        defaultValues: itemOption || {
            optionName: "",
            manyCanBeChosen: false,
            oneMustBeChosen: false,
            lengthSelect: 1,
            choices: []
        }
    });
    const { fields: fieldChoices, append, remove, } = useFieldArray({ control: form.control, name: "choices" });

    const handleSubmitChoice = (data: OptionChoiceSchema) => {
        append(data);
        modalContext.closeModal();
    };

    const handleSaveOption = async (data: ProductOptionSchema) => {
        try {
            await createProductOption({ ...data, storeId: params.bId.toString() });
            window.location.assign(`/businesses/${params.bId}/menu-option`);
        } catch (error) {
            toast({
                title: "ERROR",
                description: report(error),
                variant: "destructive",
                duration: 3 * 1000
            });
        }
    };

    useEffect(() => {
        setTitle(title);
    }, [setTitle]);
    
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSaveOption)} className='container '>
                <HeadingModule >
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
                                        name={"optionName"}
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
                                                if (form.getValues("lengthSelect") >= form.getValues("choices").length) {
                                                    return;
                                                }
                                                form.setValue("lengthSelect", form.getValues("lengthSelect") + 1);
                                            }}>
                                                <Plus className={`text-center ${form.getValues("lengthSelect") >= form.getValues("choices").length ? "disabled" : ""}`} size={14} />
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
                                                        name={`choices.${index}.name`}
                                                        readOnly
                                                    />
                                                </div>
                                                <Select
                                                    value={form.watch(`choices.${index}.status`)}
                                                    onValueChange={v => form.setValue(`choices.${index}.status`, v as ChoiceStatusEnum)}
                                                >
                                                    <SelectTrigger className={
                                                        cn(
                                                            "w-[152px] h-[30px] rounded-lg flex flex-row gap-4 p-3 justify-center focus:ring-0",
                                                            form.watch(`choices.${index}.status`) === choiceStatusEnum.Enum.available
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