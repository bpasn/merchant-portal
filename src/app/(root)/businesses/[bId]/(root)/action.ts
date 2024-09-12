'use server';
import { getSession } from "@/app/auth";
import { StoreModal } from "@/lib/schema/storeSchema";
import { report } from "@/lib/utils";
import axiosClient from "@/lib/utils/axios-client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const actionBus = async () => {
    const session = await getSession();
    try {
        const { data } = await axiosClient.get<ApiResponse<StoreModal>>("/api/store",{
            headers:{
                "Authorization":`Bearer ${session?.user?.accessToken}`
            }
        });
        if (data.payload) {
            revalidatePath('/businesses');
            redirect(`/businesses/${data.payload.id}/menu`);
        }
    } catch (error) {
        throw new Error(report(error));
    }
};