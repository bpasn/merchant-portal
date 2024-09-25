"use server";

import { IProductStockModel } from "@/types/product-stock";
import ApiRoute from "../constant/api-route";
import { ProductModal } from "../schema/productSchema";
import { StockProductModal } from "../schema/productStockSchema";
import { report } from "../utils";
import axiosServer from "../utils/axios-server";

export const productGetAction = async (storeId: string, page: number, size: number) => {
    try {
        const { data } = await axiosServer.get(`${ApiRoute.PRODUCT}?storeId=${storeId}&page=${page}&size=${size}`);
        return data;
    } catch (error) {
        throw new Error(report(error));
    }
};

export const getProductById = async (productId: string): Promise<ProductModal> => {
    try {
        const { data: product } = await axiosServer.get<ApiResponse<ProductModal>>(`${ApiRoute.PRODUCT}/${productId}`);
        return product.payload;
    } catch (error) {
        throw new Error(report(error));
    }
};


export const createProduct = async (formData: FormData) => {
    try {
        await axiosServer.post(ApiRoute.PRODUCT, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
    } catch (error) {
        throw new Error(report(error));
    }
};
export const updateProduct = async (formData: FormData, productId: string) => {
    try {
        await axiosServer.put(`${ApiRoute.PRODUCT}/${productId}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
    } catch (error) {
        throw new Error(report(error));
    }
};

export const productImageDelete = async (id: string) => {
    try {
        await axiosServer.delete(`${ApiRoute.PRODUCT_IMAGE}/${id}`);
    } catch (error) {
        throw new Error(report(error));
    }
};

export const deleteProduct = async (id: string) => {
    try {
        await axiosServer.delete(`${ApiRoute.PRODUCT}/${id}`);
    } catch (error) {
        throw new Error(report(error))
    }
}

export const updateProductStock = async (stock: StockProductModal) => {
    try {
        const response = await axiosServer.put(ApiRoute.PRODUCT_STOCK, stock);
    } catch (error) {
        throw new Error(report(error));
    }
}

export const getProductStock = async (storeId: string):Promise<IProductStockModel[]> => {
    try {
        const { data } = await axiosServer.get<ApiResponse<IProductStockModel[]>>(`${ApiRoute.PRODUCT}/stock/${storeId}`);
        return data.payload;
    } catch (error) {
        throw new Error(report(error));
    }
};