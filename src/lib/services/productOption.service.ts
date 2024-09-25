"use server";

import ApiRoute from "../constant/api-route";
import { ProductOptionModal, ProductOptionSchema } from "../schema/ProductOptionSchema";
import { report } from "../utils";
import axiosServer from "../utils/axios-server";

export const optionGetAction = async (storeId: string): Promise<ProductOptionModal[]> => {
    try {
        const { data } = await axiosServer.get<ApiResponse<ProductOptionModal[]>>(`${ApiRoute.PRODUCT_OPTION}`, {
            params: {
                storeId
            }
        });
        return data.payload;
    } catch (error) {
        throw new Error(report(error));
    }
};

export const getOptionById = async (optionId: string): Promise<ProductOptionModal> => {
    try {
        const { data } = await axiosServer.get<ApiResponse<ProductOptionModal>>(`${ApiRoute.PRODUCT_OPTION}/${optionId}`);
        return data.payload;
    } catch (error) {
        throw new Error(report(error));
    }
};

export const createProductOption = async (data: ProductOptionSchema & { storeId: string; }) => {
    try {
        await axiosServer.post<ApiResponse<any>>(ApiRoute.PRODUCT_OPTION, data);
    } catch (error) {
        throw new Error(report(error));
    }
};

export const deleteOption = async (id: string) => {
    try {
        await axiosServer.delete(`${ApiRoute.PRODUCT_OPTION}/${id}`);
    } catch (error) {
        throw new Error(report(error));
    }

};