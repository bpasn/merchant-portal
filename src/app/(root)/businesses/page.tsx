import TestComponent from "./[bId]/component/test";
import { redirect } from "next/navigation";
import { StoreModal } from "@/lib/schema/storeSchema";
import axiosServer from "@/lib/utils/axios-server";
import { unstable_noStore } from "next/cache";
import axiosClient from "@/lib/utils/axios-client";
const BusinessesRoot = async () => {
    "use server"
    const { data } = await axiosServer.get<ApiResponse<StoreModal>>(`/store/find-one`,{
        params:{
            ts:new Date().getTime()
        }
    });
    if (data.payload) {
        redirect(`/businesses/${data.payload.id}/menu`);
    } 
    
    return <TestComponent />;
};

export default BusinessesRoot;
