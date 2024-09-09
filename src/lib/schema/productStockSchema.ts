import { z } from "zod";


export const stockUnitTypeEnum = z.enum(["PIECE", "KILOGRAM", "GRAM"]);
export type StockUnitTypeEnum = z.infer<typeof stockUnitTypeEnum>;
export const stockStatusEnum = z.enum(["IN_STOCK", "OUT_OF_STOCK","LOW_STOCK"])
export type StockStatusEnum = z.infer<typeof stockStatusEnum>;

export const stockProductSchema = z.object({
    unitType: stockUnitTypeEnum.default("PIECE"),
    unitQuantity:z.coerce.number().default(1),
    quantity:z.coerce.number().default(0),
    status:stockStatusEnum.default("IN_STOCK"),
    reOrder:z.boolean().default(false)
});

export type StockProductSchema = z.infer<typeof stockProductSchema>;