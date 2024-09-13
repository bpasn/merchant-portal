'use server';

import { StoreModal, StoreSchema } from "../schema/storeSchema";
import axiosServer from "../utils/axios-server";
import { report } from "../utils";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getSession } from "@/app/auth";

export const getStore = async () => {
    try {
        const { data } = await axiosServer.get<ApiResponse<StoreModal>>(`/store/find-one`);
        if (data.payload) {
            revalidatePath('/businesses');
            redirect(`/businesses/${data.payload.id}/menu`);
        }
    } catch (error) {
        throw new Error(report(error));
    }
}

export const getStoreById = async (id: string) => {
    try {

        const { data } = await axiosServer.get<ApiResponse<StoreModal>>(`/store/${id}`);
        if (!data.payload) {
            redirect('/')
        }
    } catch (error) {
        redirect('/')
    }
}

export const getAllStore = async (): Promise<StoreModal[]> => {
    const { data } = await axiosServer.get<ApiResponse<StoreModal[]>>(`/store`);
    if (!data.payload.length) {
        redirect('/businesses/menu');
    }
    return Promise.resolve(data.payload);
}

export const createStore = async (store: StoreSchema): Promise<string> => {
    const { data } = await axiosServer.post<ApiResponse<StoreModal>>("/store", store);
    return data.payload.id
}