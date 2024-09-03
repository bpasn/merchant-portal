import { z } from "zod";

export const categoriesSchema = z.object({
    groupName:z.string().min(1,"Item option not must be null"),
});
export type CategoriesSchema = z.infer<typeof categoriesSchema>;
