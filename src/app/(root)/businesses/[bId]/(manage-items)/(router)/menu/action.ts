import { ProductModal } from "@/lib/schema/productSchema";
import axiosClient from "@/lib/utils/axios-client";
import axiosServer from "@/lib/utils/axios-server";

export const productGetAction = async (page: number, size: number) => {
    try {
        const { data } = await axiosServer.get<ApiResponse<IDataTable<ProductModal>>>(`/api/product?page=${page}&size=${size}`);
        return data;
    } catch (error) {
        throw new Error("Something went wrong!!")
    }
};