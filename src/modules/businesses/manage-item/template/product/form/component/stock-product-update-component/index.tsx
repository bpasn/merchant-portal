import { Form } from "@/components/ui/form";
import { EachElement, ElementRenderWhen } from "@/lib/utils";
import { MinusIcon, PlusIcon } from "lucide-react";
import React, { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { ProductModal } from "@/lib/schema/productSchema";
import { Button } from "@/components/ui/button";
import OptionChoiceCheckGroup from "./components/option-choice-checkbox";
import OptionChoiceRadioGroup from "./components/option-choice-radio";
import { ProductOptionModal } from "@/lib/schema/ProductOptionSchema";
import { UseControllerProps } from "@/modules/common/form-field";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
interface IStockProductUpdateProps {
    product: ProductModal;
}


export const schemeChoiceObj = z.object({
    optionName: z.string(),
    choice: z.array(
        z.object({
            id: z.string()
        })
    )
});
export type SchemeChoiceObj = z.infer<typeof schemeChoiceObj>;
const schemeSelect = z.object({
    selected: schemeChoiceObj.array()
});

export type InferSchemeSelected = z.infer<typeof schemeSelect>;

export interface OptionChoiceStockProps<T extends FieldValues> extends UseControllerProps<T> {
    option: ProductOptionModal;
}
const StockProductUpdateComponent = ({ product }: IStockProductUpdateProps) => {
    const form = useForm<InferSchemeSelected>({
        resolver: zodResolver(schemeSelect),
        defaultValues: {
            selected: []
        }
    });
    const [qty, setQty] = useState(1);

    const onClick = (adjustment: number) => {
        setQty(Math.max(1, Math.min(product?.stock.quantity!, qty + adjustment)));
    };

    return (
        <Form {...form}>
            <form className='flex flex-col gap-2 mt-2'>
                <EachElement
                    of={product.productOptions}
                    render={(option, index) => {
                        console.log({manyCanBeChosen:option})
                        return (
                            <ElementRenderWhen _if={option.manyCanBeChosen} _el={(
                                <OptionChoiceRadioGroup
                                    name={`selected.${index}`}
                                    control={form.control}
                                    option={option} />
                            )}>
                                <OptionChoiceCheckGroup option={option} control={form.control} name={`selected.${index}`} />
                            </ElementRenderWhen>
                        )
                    }}
                />
                <div className="p-4 border shadow-md">
                    <div className="flex items-center justify-center space-x-2">
                        <Button
                            variant="outline"
                            size="icon"
                            type="button"
                            className="h-8 w-8 shrink-1 rounded-full"
                            onClick={() => onClick(-1)}
                            disabled={qty <= 1}
                        >
                            <MinusIcon className="h-4 w-4" />
                            <span className="sr-only">Decrease</span>
                        </Button>
                        <div className="text-center">
                            <div className="text-md md:text-lg font-bold tracking-tighter">
                                {qty}
                            </div>
                            <div className="text-[0.70rem] uppercase text-muted-foreground">
                                Quantity
                            </div>
                        </div>
                        <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 shrink-0 rounded-full"
                            onClick={() => onClick(1)}
                            disabled={qty >= product?.stock.quantity!}
                        >
                            <PlusIcon className="h-4 w-4" />
                            <span className="sr-only">Increase</span>
                        </Button>
                    </div>
                </div>
                <Button className="mt-4" type="button">Update</Button>
            </form>
        </Form>
    );
};

export default StockProductUpdateComponent;