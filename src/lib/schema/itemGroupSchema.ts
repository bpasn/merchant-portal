import { z } from "zod";

export const itemGroupSchema = z.object({
    name:z.string().min(1,"Item option not must be null"),
});
export type ItemGroupSchema = z.infer<typeof itemGroupSchema>;
