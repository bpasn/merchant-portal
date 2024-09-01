import { z } from "zod";

export const productGroupSchema = z.object({
    groupName:z.string().min(1,"Item option not must be null"),
    isRequired:z.boolean().default(false)
});
export type ProductGroupSchema = z.infer<typeof productGroupSchema>;
