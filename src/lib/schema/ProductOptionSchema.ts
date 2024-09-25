import { z } from "zod";
import { optionChioceSchema } from "./optionChioceSchema";


export const productOptionSchema = z.object({
    id: z.string().optional().nullable(),
    optionName: z.string().min(1,{message:"Option name must not be null"}),
    oneMustBeChosen: z.boolean().default(false),
    manyCanBeChosen: z.boolean().default(false),
    lengthSelect: z.number().optional().default(0),
    choices: z.array(optionChioceSchema).default([]),
});
export type ProductOptionSchema = z.infer<typeof productOptionSchema>;
export type ProductOptionModal = {} & ProductOptionSchema;