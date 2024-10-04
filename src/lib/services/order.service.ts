"use server";

import { Order } from "@/types/order";
import { report } from "../utils";
import axiosServer from "../utils/axios-server";

export const getOrders = async (): Promise<Order[]> => {
    try {
        const { data } = await axiosServer.get<ApiResponse<Order[]>>("http://localhost:8888/api/v1/client/order");
        return data.payload;
    } catch (error) {
        throw new Error(report(error));
    }
}