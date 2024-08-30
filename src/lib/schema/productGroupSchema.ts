import { z } from "zod";

export const productGroupSchema = z.object({
    name:z.string().min(1,"Item option not must be null"),
});
export type ProductGroupSchema = z.infer<typeof productGroupSchema>;
