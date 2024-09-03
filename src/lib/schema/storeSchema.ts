import { z } from "zod";

export const storeSchema = z.object({
    storeName: z.string().min(1,{message:"Store name can't be null"})
})

export type StoreSchema = z.infer<typeof storeSchema>;

export type StoreModal = {
    id: string,
} & StoreSchema;