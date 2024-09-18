"use server"

import { CategoriesModal } from "../schema/categoriesSchema";
import { ProductOptionModal, ProductOptionSchema } from "../schema/ProductOptionSchema";
import { ProductModal } from "../schema/productSchema";
import { report } from "../utils";
import axiosServer from "../utils/axios-server";

export const productGetAction = async (storeId: string, page: number, size: number) => {
    try {
        const { data } = await axiosServer.get<ApiResponse<IDataTable<ProductModal>>>(`/products?storeId=${storeId}&page=${page}&size=${size}`);
        return data;
    } catch (error) {
        throw new Error(report(error))
    }
};


export const optionGetAction = async (storeId: string): Promise<ProductOptionModal[]> => {
    try {
        const { data } = await axiosServer.get<ApiResponse<ProductOptionModal[]>>(`/product-option`, {
            params: {
                storeId
            }
        });
        return data.payload;
    } catch (error) {
        throw new Error(report(error))
    }
};


export const categoryGetAction = async (storeId: string): Promise<CategoriesModal[]> => {
    try {
        const { data } = await axiosServer.get<ApiResponse<CategoriesModal[]>>(`/categories`, {
            params: {
                storeId
            }
        });
        return data.payload;
    } catch (error) {
        throw new Error(report(error))
    }
};

export const getProductById = async (productId: string): Promise<ProductModal> => {
    try {
        const { data: product } = await axiosServer.get<ApiResponse<ProductModal>>(`/products/${productId}`);
        return product.payload;
    } catch (error) {
        throw new Error(report(error));
    }
}

export const getCategoryById = async (categoryId: string): Promise<CategoriesModal> => {
    try {
        const { data } = await axiosServer.get<ApiResponse<CategoriesModal>>(`/categoris/${categoryId}`);
        return data.payload
    } catch (error) {
        throw new Error(report(error));
    }
}
export const getOptionById = async (optionId: string): Promise<ProductOptionModal> => {
    try {
        const { data } = await axiosServer.get<ApiResponse<ProductOptionModal>>(`/product-option/${optionId}`);
        return data.payload
    } catch (error) {
        throw new Error(report(error));
    }
}

export const createProductOption = async (data: ProductOptionSchema & { storeId: string }) => {
    await axiosServer.post<ApiResponse<any>>("/product-option", data);
}
export const createCategory = async (data: CategoriesModal & { storeId: string }) => {
    await axiosServer.post<ApiResponse<any>>("/categories", data);
}

export const createProduct = async (formData: FormData) => {
    await axiosServer.post("/products", formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
}
export const updateProduct = async (formData: FormData, productId: string) => {
    await axiosServer.put(`/products/${productId}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
}
