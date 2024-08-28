import { z } from "zod";
import { itemOptionSchema } from "./itemOptionSchema";
import { itemGroupSchema } from "./itemGroupSchema";

export const formItemSchema = z.object({
    nameTH: z.string().min(1, "Name is required"),
    nameEN: z.string(),
    price: z.number().min(0, "Price must be greater than or equal to 0"),
    descriptionTH: z.string().nullable().optional(),
    descriptionEN: z.string().nullable().optional(),
    images: z.array(
        z.instanceof(File).refine(file => file.size >= 2 * 1024 * 1024, {
            message: "Image must be less than 2MB"
        })).min(0),
    itemOption: z.array(itemOptionSchema.pick({
        name: true
    })),
    itemGroup: z.array(itemGroupSchema)
});

export type FormItemSchema = z.infer<typeof formItemSchema>;

