'use server'
import { StoreModal } from "@/lib/schema/storeSchema";
import axiosClient from "@/lib/utils/axios-client";
import { redirect } from "next/navigation";

export const checkId = async (id:string) => {
    try {
        const { data } = await axiosClient.get<ApiResponse<StoreModal>>(`/api/store/${id}`);
        if(!data.payload){
          redirect('/')
        }
      } catch (error) {
        redirect('/')
      }
}