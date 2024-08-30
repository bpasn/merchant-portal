import { z } from "zod";
import { productOptionSchema } from "./ProductOptionSchema";
import { productGroupSchema } from "./productGroupSchema";
import { stockProductSchema } from "./productStockSchema";

export const productSchema = z.object({
    nameTH: z.string().min(1, "Name is required"),
    nameEN: z.string(),
    price: z.number().min(0, "Price must be greater than or equal to 0"),
    descriptionTH: z.string().nullable().optional(),
    descriptionEN: z.string().nullable().optional(),
    stock: stockProductSchema,
    images: z.array(
        z.custom<File>(file => file instanceof File && file.size >= 2 * 1024 * 1024, {
            message: "Image must be less than 2MB"
        })).min(0),
    itemOption: z.array(productOptionSchema.pick({
        name: true
    })),
    itemGroup: z.array(productGroupSchema)
});

export type ProductSchema = z.infer<typeof productSchema>;

