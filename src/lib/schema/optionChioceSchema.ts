import { z } from "zod";

export const choiceStatusEnum = z.enum(['available', 'suspended']);
export type ChoiceStatusEnum = z.infer<typeof choiceStatusEnum>;
export const choiceEffectEnum = z.enum(['unchanged', 'increased', 'decreased']);
export type ChoiceEffectEnum = z.infer<typeof choiceEffectEnum>;
export const optionChioceSchema = z.object({
    name: z.string().min(1, "Choice name is required"),
    choiceEffect: choiceEffectEnum.nullable().optional(),
    price: z.number().optional().default(0),
    status: choiceStatusEnum
});

export type OptionChoiceSchema = z.infer<typeof optionChioceSchema>;
export type OptionChoiceModal = { id: string } & OptionChoiceSchema;