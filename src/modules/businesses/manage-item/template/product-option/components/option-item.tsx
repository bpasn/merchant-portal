import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { EachElement, report } from "@/lib/utils";
import DropdownAction from "@/modules/common/dropdown-action";
import { useState } from "react";
import { renderSelectStatus } from "..";
import { ProductOptionModal } from "@/lib/schema/ProductOptionSchema";
import { useStoreProgress } from "@/lib/hooks/stores/store-progress";
import { deleteOption } from "@/lib/services/productOption.service";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

const OptionItem = (option: ProductOptionModal) => {
    const progress = useStoreProgress();
    const router = useRouter();
    const onEdit = async () => { };
    const onDelete = async () => {
        progress.inProgress();
        try {
            await deleteOption(option.id!);
            router.refresh();
        } catch (error) {
            toast({
                title: "EXCEPTION",
                description: report(error),
                variant: "destructive"
            });
        } finally {
            progress.done();
        }
    };
    return (<div className='flex flex-row gap-2 relative items-center'>
        <div className="flex-1">
            <AccordionItem key={option.optionName} value={option.optionName!} className='border-none'>
                <AccordionTrigger className='ease-in-out transition-all duration-300 px-5 rounded-sm'>{option.optionName}</AccordionTrigger>
                <AccordionContent>
                    <div className="ml-5">
                        <EachElement
                            of={option.choices || []}
                            render={(choice, choiceIndex) => {
                                const [status, setStatus] = useState(choice.status);
                                return (
                                    <div key={choiceIndex} className='flex flex-row gap-5 items-center border-b-2 border-b-gray-100 py-3 px-3'>
                                        <div className="w-full">
                                            <h1>{choice.name}</h1>
                                        </div>
                                        {renderSelectStatus(status, setStatus)}
                                    </div>
                                );
                            }}
                        />
                    </div>
                </AccordionContent>
            </AccordionItem>
        </div>
        <div className="pr-5" />
        <div className="pr-5 absolute top-[10px] -right-[7px] ">
            <DropdownAction
                icon="EllipsisVertical"
                iconClass="border-none"
                onEdit={onEdit}
                onDelete={onDelete}
            />
        </div>
    </div>);
};

export default OptionItem;