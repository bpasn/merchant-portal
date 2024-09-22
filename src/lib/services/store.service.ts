'use server';

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { StoreModal, StoreSchema } from "../schema/storeSchema";
import axiosServer from "../utils/axios-server";
import { report } from "../utils";
import { AxiosError } from "axios";

export const getStore = async () => {
    try {
        const { data } = await axiosServer.get<ApiResponse<StoreModal>>(`/store/find-one`);
        if (data.payload) {
            const fullPath = await setFullPath(data.payload.id);
            revalidatePath('/businesses');
            redirect(fullPath);
        }
    } catch (error) {
        if(error instanceof AxiosError){
            console.log(error.response)
        }
        throw new Error(report(error));
    }
};

export const setFullPath = async (id: string) => {
    const path = await getPathName();
    return path.split('/').map((segment, index) => index === 1 ? `${segment}/${id}` : segment).join('/');
};
export const getPathName = async () => {
    const headersList = headers();
    const pathName = headersList.get("x-pathname") || "";
    return pathName;
};
export const getStoreById = async (id: string) => {
    try {
        const { data } = await axiosServer.get<ApiResponse<StoreModal>>(`/store/${id}`);
        if (!data.payload) {
            redirect('/');
        }
    } catch (error) {
        redirect('/');
    }
};

export const getAllStore = async (): Promise<StoreModal[]> => {
    const { data } = await axiosServer.get<ApiResponse<StoreModal[]>>(`/store`);
    if (!data.payload.length) {
        const fullPath = await getPathName();
        redirect(fullPath);
    }
    return data.payload;
};

export const createStore = async (store: StoreSchema): Promise<string> => {
    const { data } = await axiosServer.post<ApiResponse<StoreModal>>("/store", store);
    return data.payload.id;
};