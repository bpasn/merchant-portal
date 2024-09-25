"use server";
import ApiRoute from "../constant/api-route";
import { CategoriesModal } from "../schema/categoriesSchema";
import { report } from "../utils";
import axiosServer from "../utils/axios-server";

export const categoryGetAction = async (storeId: string): Promise<CategoriesModal[]> => {
    try {
        const { data } = await axiosServer.get<ApiResponse<CategoriesModal[]>>(`${ApiRoute.PRODUCT_CATEGORY}`, {
            params: {
                storeId
            }
        });
        return data.payload;
    } catch (error) {
        throw new Error(report(error));
    }
};

export const getCategoryById = async (categoryId: string): Promise<CategoriesModal> => {
    try {
        const { data } = await axiosServer.get<ApiResponse<CategoriesModal>>(`${ApiRoute.PRODUCT_CATEGORY}/${categoryId}`);
        return data.payload;
    } catch (error) {
        throw new Error(report(error));
    }
};

export const createCategory = async (data: CategoriesModal & { storeId: string; }) => {
    try {
        await axiosServer.post<ApiResponse<any>>(ApiRoute.PRODUCT_CATEGORY, data);
    } catch (error) {
        throw new Error(report(error));
    }
};