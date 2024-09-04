import axiosServer from "@/lib/utils/axios-server";
import { handleResponse } from "@/lib/utils/handle-response";
import { handleError } from "@/lib/utils/handler-exception";
import { HttpStatus } from "@/lib/utils/http-status";
import { NextRequest} from "next/server";

export const GET = async (req: NextRequest, { params }: {
    params: {
        id: string;
    };
}) => {
    try {
        const { data } = await axiosServer.get(`/store/${params.id}`);
        return handleResponse(data, HttpStatus.OK);
    } catch (error) {
        return handleError(error)
    }
};