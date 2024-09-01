import { z } from "zod";
import { optionChioceSchema } from "./optionChioceSchema";


export const productOptionSchema = z.object({
    optionName:z.string().min(1,"Item option not must be null"),
    oneMustBeChosen:z.boolean(),
    manyCanBeChosen:z.boolean(),
    lengthSelect:z.number().optional().default(0),
    choices:z.array(optionChioceSchema),
    

});
export type ProductOptionSchema = z.infer<typeof productOptionSchema>;
