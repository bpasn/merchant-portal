"use server";

import { AxiosError } from "axios";
import ApiRoute from "../constant/api-route";
import { CategoriesModal } from "../schema/categoriesSchema";
import { ProductOptionModal, ProductOptionSchema } from "../schema/ProductOptionSchema";
import { ProductModal } from "../schema/productSchema";
import { StockProductModal } from "../schema/productStockSchema";
import { report } from "../utils";
import axiosServer from "../utils/axios-server";

export const productGetAction = async (storeId: string, page: number, size: number) => {
    try {
        const { data } = await axiosServer.get<ApiResponse<IDataTable<ProductModal>>>(`${ApiRoute.PRODUCT}?storeId=${storeId}&page=${page}&size=${size}`);
        return data;
    } catch (error) {
        throw new Error(report(error));
    }
};


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

export const getProductById = async (productId: string): Promise<ProductModal> => {
    try {
        const { data: product } = await axiosServer.get<ApiResponse<ProductModal>>(`${ApiRoute.PRODUCT}/${productId}`);
        return product.payload;
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
export const createCategory = async (data: CategoriesModal & { storeId: string; }) => {
    try {
        await axiosServer.post<ApiResponse<any>>(ApiRoute.PRODUCT_CATEGORY, data);
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