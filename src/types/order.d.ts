import { ProductModal } from "@/lib/schema/productSchema";
import { OptionChoiceScheme } from "../schemes/product-option";
import { ProductOptionModal } from "@/lib/schema/ProductOptionSchema";
import { OptionChoiceModal } from "@/lib/schema/optionChioceSchema";

interface Order {
    id: string;
    orderStatus: 'PENDING' | 'CLOSE' | 'DONE',
    totalAmount: number;
    createdAt: Date;
    updatedAt: Date;
    orderItems: OrderItem[];
}

interface OrderItem {
    id: string;
    product: ProductModal;
    quantity: number;
    orderItemOptions: OrderItemOption[]
}

interface OrderItemOption {
    id: string;
    productOption: ProductOptionModal;
    orderItemOptionChoice: OrderItemOptionChoice[]
}

interface OrderItemOptionChoice {
    id: string;
    optionChoice: OptionChoiceModal
}