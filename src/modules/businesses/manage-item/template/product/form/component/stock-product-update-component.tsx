import { Form } from "@/components/ui/form";
import { EachElement, ElementRenderWhen } from "@/lib/utils";
import { MinusIcon, PlusIcon } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import OptionComponent from "./option-component";
import { ProductModal } from "@/lib/schema/productSchema";
import { Button } from "@/components/ui/button";
import { optionChioceSchema, OptionChoiceModal, OptionChoiceSchema } from "@/lib/schema/optionChioceSchema";
import ImageProvider from "@/modules/common/image-provider";
import { zodResolver } from "@hookform/resolvers/zod";
interface IStockProductUpdateProps {
    product: ProductModal;
}
const StockProductUpdateComponent = ({ product }: IStockProductUpdateProps) => {
    const form = useForm<OptionChoiceSchema[]>({
        resolver:zodResolver(optionChioceSchema),
        defaultValues: []
    });
    const [qty, setQty] = useState(1);

    const onClick = (adjustment: number) => {
        setQty(Math.max(1, Math.min(product?.stock.quantity!, qty + adjustment)));
    };
    const onRadioChange = (value: OptionChoiceModal) => {

    };
    return (
        <React.Fragment>
            <div className="w-full flex justify-center">
                <ImageProvider
                    src={product.productImages[0].uri}
                    height={200}
                    width={200}
                    className="object-fill"
                />
            </div>
            <Form {...form}>
                <form className='flex flex-col gap-2 mt-2'>
                    <ElementRenderWhen _if={product.productOptions.length > 0} _el={null}>
                        <EachElement
                            of={product.productOptions}
                            render={(option) => <OptionComponent checked={false} option={option} onRadioChange={onRadioChange} />}
                        />
                    </ElementRenderWhen>
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
        </React.Fragment>
    );
};

export default StockProductUpdateComponent;