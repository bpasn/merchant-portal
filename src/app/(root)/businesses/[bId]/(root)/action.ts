'use server';
import { StoreModal } from "@/lib/schema/storeSchema";
import axiosClient from "@/lib/utils/axios-client";
import { revalidatePath } from "next/cache";
import { permanentRedirect, redirect } from "next/navigation";

export const actionBus = async () => {
    const { data } = await axiosClient.get<ApiResponse<StoreModal>>("/api/store");
    if (data.payload) {
        revalidatePath('/businesses');
        redirect(`/businesses/${data.payload.id}/menu`);
    }
};