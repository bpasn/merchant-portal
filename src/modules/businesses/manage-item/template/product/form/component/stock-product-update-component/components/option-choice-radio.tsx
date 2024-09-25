import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { OptionChoiceModal } from "@/lib/schema/optionChioceSchema";
import { cn, EachElement } from "@/lib/utils";
import { Check } from "lucide-react";
import {  FieldValues } from "react-hook-form";
import { OptionChoiceStockProps } from "..";


const OptionChoiceRadioGroup = <T extends FieldValues>({
    option: {
        optionName,
        oneMustBeChosen,
        choices,
    },
    name,
    control
}: OptionChoiceStockProps<T>) => {

    return (
        <div className="border p-4 shadow-md flex flex-col gap-3">
            <div className="flex flex-row items-center gap-2">
                <h3 className='font-bold'>{optionName}</h3>
                <span className="text-xs text-gray-400">{
                    oneMustBeChosen ? "Pick 1" : ""
                }</span>
                <div className={cn(
                    "p-0 m-0 ml-auto rounded-full h-4 w-4 shadow-md ring-ring bg-primary align-middle flex items-center justify-center text-white "
                )}>
                    <Check size={12} strokeWidth={3} />
                </div>
            </div>
            <FormField
                control={control}
                name={name}
                render={({ field }) => {
                    return (
                        <FormItem>
                            <FormControl>
                                <RadioGroup defaultValue={field.value} onValueChange={(value:string) => {
                                    console.log(value)
                                }} className=' font-normal text-gray-600'>
                                    <EachElement
                                        of={(choices || []) as OptionChoiceModal[]}
                                        render={(choice) => (
                                            <FormItem className="flex items-center space-x-2">
                                                <FormControl>
                                                    <RadioGroupItem value={choice.id} className="cursorp" id={choice.id} />
                                                </FormControl>
                                                <Label htmlFor={choice.name} className='font-normal cursor-pointer' >{choice.name}</Label>
                                            </FormItem>
                                        )}
                                    />
                                </RadioGroup>
                            </FormControl>
                        </FormItem>
                    )
                }}
            />

        </div>
    );
};

export default OptionChoiceRadioGroup;