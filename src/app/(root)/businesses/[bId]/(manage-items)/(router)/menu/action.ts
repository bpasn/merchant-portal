import { ProductModal } from "@/lib/schema/productSchema";
import axiosClient from "@/lib/utils/axios-client";

export const productGetAction = async (page: number, size: number) => {
    try {
        const { data } = await axiosClient.get<ApiResponse<IDataTable<ProductModal>>>(`/api/product?page=${page}&size=${size}`);
        return data;
    } catch (error) {
        console.log(error);
        throw new Error("Something went wrong!!")
    }
};