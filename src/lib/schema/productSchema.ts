import { z } from "zod";
import { productOptionSchema } from "./ProductOptionSchema";
import { categoriesSchema } from "./categoriesSchema";
import { stockProductSchema } from "./productStockSchema";

export const productSchema = z.object({
    nameTH: z.string().min(1, "Name is required"),
    nameEN: z.string(),
    price: z.coerce.number().min(0, "Price must be greater than or equal to 0"),
    descriptionTH: z.string().nullable().optional(),
    descriptionEN: z.string().nullable().optional(),
    stock: stockProductSchema,
    images: z.array(
        z.custom<File>(file => {
            if(file instanceof File){
                if(file.size > 5 * 1024 * 1024){
                    console.log("THIS")
                    return false
                }
            }
            return true
        }, {
            message: "Image must be less than 2MB"
        })).refine((v) => {
            if(!v.length) return false;
            return true;
        },{message:"Images not must be null"}),
    productOptions: z.array(productOptionSchema.pick({
        optionName: true
    })),
    categories: z.array(categoriesSchema)
});

export type ProductSchema = z.infer<typeof productSchema>;

