"use server";

import { Order } from "@/types/order";
import { report } from "../utils";
import axiosServer from "../utils/axios-server";
import ApiRoute from "../constant/api-route";

export const getOrders = async (): Promise<Order[]> => {
    try {
        const { data } = await axiosServer.get<ApiResponse<Order[]>>(ApiRoute.ORDER);
        return data.payload;
    } catch (error) {
        throw new Error(report(error));
    }
}