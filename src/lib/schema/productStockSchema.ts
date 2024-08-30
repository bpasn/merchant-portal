import { z } from "zod";


export const stockUnitTypeEnum = z.enum(["piece", "kilogram", "gram"]);
export type StockUnitTypeEnum = z.infer<typeof stockUnitTypeEnum>;
export const stockStatusEnum = z.enum(["inStock", "outOfStock"])
export type StockStatusEnum = z.infer<typeof stockStatusEnum>;

export const stockProductSchema = z.object({
    unitType: stockUnitTypeEnum.default("piece"),
    unitQuantity:z.number().default(1),
    quantity:z.number().default(0),
    status:stockStatusEnum.default("inStock"),
    reOrder:z.boolean().default(false)
});

export type StockProductSchema = z.infer<typeof stockProductSchema>;