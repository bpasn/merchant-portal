'use server';

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { StoreModal, StoreSchema } from "../schema/storeSchema";
import axiosServer from "../utils/axios-server";
import ApiRoute from "../constant/api-route";
import logger from "../utils/logger";
import { report } from "../utils";
export const getStore = async () => {
    const { data } = await axiosServer.get<ApiResponse<StoreModal>>(ApiRoute.STORE + `/find-one`);
    if (data.payload) {
        const fullPath = await setFullPath(data.payload.id);
        console.log({ fullPath })
        revalidatePath('/businesses');
        redirect(fullPath);
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
        const { data } = await axiosServer.get<ApiResponse<StoreModal>>(ApiRoute.STORE + `/${id}`);
        if (!data.payload) {
            redirect('/');
        }
    } catch (error) {
        console.log(report(error))
        logger.error((error as Error).message)
        redirect('/');
    }
};

export const getAllStore = async (): Promise<StoreModal[]> => {
    const { data } = await axiosServer.get<ApiResponse<StoreModal[]>>(ApiRoute.STORE);
    if (!data.payload.length) {
        const fullPath = await getPathName();
        redirect(fullPath);
    }
    return data.payload;
};

export const createStore = async (store: StoreSchema): Promise<string> => {
    const { data } = await axiosServer.post<ApiResponse<StoreModal>>(ApiRoute.STORE, store);
    return data.payload.id;
};