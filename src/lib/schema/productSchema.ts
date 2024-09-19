import { z } from "zod";
import { ProductOptionModal, productOptionSchema } from "./ProductOptionSchema";
import { CategoriesModal, categoriesSchema } from "./categoriesSchema";
import { StockProductModal, stockProductSchema } from "./productStockSchema";
import ObjectFile from "@/modules/businesses/manage-item-module/component/object-file";

export const productSchema = z.object({
    nameTH: z.string().min(1, "Name is required"),
    nameEN: z.string(),
    price: z.coerce.number().min(0, "Price must be greater than or equal to 0"),
    descriptionTH: z.string().nullable().optional(),
    descriptionEN: z.string().nullable().optional(),
    stock: stockProductSchema,
    productImages: z.array(
        z.custom<File | ObjectFile>(file => {
            if (file instanceof File) {
                if (file.size > 5 * 1024 * 1024) {
                    return false;
                }
            }
            return true;
        }, {
            message: "Image must be less than 2MB"
        })).refine((v) => {
            if (!v.length) return false;
            return true;
        }, { message: "Images not must be null" }),
    productOptions: z.array(productOptionSchema),
    categories: z.array(categoriesSchema)
});

export type ProductSchema = z.infer<typeof productSchema>;

export interface ProductModal extends Omit<ProductSchema, "productImages" | "stock" | "productOptions"> {
    id: string;
    productImages: ObjectFile[];
    stock: StockProductModal;
    productOptions: ProductOptionModal[]
};