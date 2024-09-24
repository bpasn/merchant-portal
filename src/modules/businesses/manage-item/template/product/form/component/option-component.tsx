import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { OptionChoiceModal } from "@/lib/schema/optionChioceSchema";
import { ProductOptionModal } from "@/lib/schema/ProductOptionSchema";
import { cn, EachElement } from "@/lib/utils";
import { Check } from "lucide-react";

interface OptionChoiceProps {
    checked: boolean;
    option: ProductOptionModal;
    onRadioChange:(e:OptionChoiceModal) => void
}
const OptionComponent = ({
    option: {
        optionName,
        oneMustBeChosen,
        manyCanBeChosen,
        lengthSelect,
        choices,
    },
    checked,
    onRadioChange
}: OptionChoiceProps) => {
    return (
        <div className="border p-4 shadow-md flex flex-col gap-3">
            <div className="flex flex-row items-center gap-2">
                <h3 className='font-bold'>{optionName}</h3>
                <span className="text-xs text-gray-400">{
                    oneMustBeChosen ? "Pick 1" : ""
                }</span>
                <div className={cn(
                    `${!checked && "hidden"}`,
                    "p-0 m-0 ml-auto rounded-full h-4 w-4 shadow-md ring-ring bg-primary align-middle flex items-center justify-center text-white "
                )}>
                    <Check size={12} strokeWidth={3} />
                </div>
            </div>
            <RadioGroup defaultValue="" className=' font-normal text-gray-600'>
                <EachElement
                    of={(choices || []) as OptionChoiceModal[]}
                    render={(choice) => (
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value={choice.name} className="cursorp" onClick={(e) => {
                                onRadioChange(choice);
                            }} id={choice.name} />
                            <Label htmlFor={choice.name} className='font-normal cursor-pointer' >{choice.name}</Label>
                        </div>
                    )}
                />
            </RadioGroup>
        </div>
    );
};

export default OptionComponent;