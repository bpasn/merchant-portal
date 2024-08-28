import { z } from "zod";
import { optionChioceSchema } from "./optionChioceSchema";


export const itemOptionSchema = z.object({
    name:z.string().min(1,"Item option not must be null"),
    oneMustBeChosen:z.boolean(),
    manyCanBeChosen:z.boolean(),
    choice:z.array(optionChioceSchema),
    

});
export type ItemOptionSchema = z.infer<typeof itemOptionSchema>;
