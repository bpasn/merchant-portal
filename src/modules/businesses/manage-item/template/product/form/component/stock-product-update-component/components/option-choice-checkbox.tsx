import { Checkbox } from "@/components/ui/checkbox";
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { toast, } from "@/components/ui/use-toast";
import { OptionChoiceModal } from "@/lib/schema/optionChioceSchema";
import { cn, EachElement, ElementRenderWhen } from "@/lib/utils";
import { Check } from "lucide-react";
import { FieldValues } from "react-hook-form";
import { OptionChoiceStockProps } from "..";

const OptionChoiceCheckGroup = <T extends FieldValues>({
    option: {
        optionName,
        oneMustBeChosen,
        choices,
        lengthSelect
    },
    control,
    name
}: OptionChoiceStockProps<T>) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => {
                const value = field.value as { optionName: string, choice: { id: string }[] };
                return (
                    <div className="border p-4 shadow-md flex flex-col gap-3">
                        <div className="flex flex-row items-center gap-2">
                            <h3 className='font-bold'>{optionName}</h3>
                            <span className="text-xs text-gray-400">{oneMustBeChosen ? "Pick 1" : ""}</span>
                            <ElementRenderWhen _if={value !== undefined}>
                                <div className={cn(
                                    "p-0 m-0 ml-auto rounded-full h-4 w-4 shadow-md ring-ring bg-primary align-middle flex items-center justify-center text-white "
                                )}>
                                    <Check size={12} strokeWidth={3} />
                                </div>
                            </ElementRenderWhen>
                        </div>
                        <FormItem>
                            <FormControl>
                                <EachElement
                                    of={(choices || []) as OptionChoiceModal[]}
                                    render={(choice) => {
                                        let currentCheck: { id: string }[] = [];
                                        if (!isValueNull(value)) {
                                            currentCheck = value.choice;
                                        }
                                        return (
                                            <FormItem className="flex inset-0 items-center space-x-2">
                                                <FormControl>
                                                    <Checkbox
                                                        checked={currentCheck.map(e => e.id).includes(choice.id)}
                                                        onCheckedChange={(checked) => {
                                                            if (checked && !isValueNull(value)) {
                                                                if (value.choice.length >= lengthSelect) {
                                                                    toast({
                                                                        title: "WARNING",
                                                                        description: "Choice limit " + lengthSelect,
                                                                        variant: "warning"
                                                                    })
                                                                    return;
                                                                }
                                                            }
                                                            const currentChoice: { id: string }[] = (!isValueNull(value) && Array.isArray(value.choice)) ? value.choice : [];
                                                            const updatedValue = checked
                                                                ? [...currentChoice, { id: choice.id }]
                                                                : currentChoice.filter(value => value.id !== choice.id);
                                                            field.onChange({ optionName, choice: updatedValue });
                                                        }}
                                                    />
                                                </FormControl>
                                                <FormLabel htmlFor={choice.name} className='!mx-3 !my-0 font-normal cursor-pointer' >{choice.name}</FormLabel>
                                            </FormItem>
                                        )
                                    }}
                                />
                            </FormControl>
                        </FormItem>
                    </div>
                );
            }}
        />
    );
};


const isValueNull = (value: any) => (value === null || value === undefined);

export default OptionChoiceCheckGroup;