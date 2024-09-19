import { z } from "zod";

export const categoriesSchema = z.object({
    id: z.string().optional().nullable(),
    name: z.string().min(1, "Item option not must be null"),
});

export type CategoriesSchema = z.infer<typeof categoriesSchema>;
export type CategoriesModal = {} & CategoriesSchema;