interface ApiResponse<Data extends object >{
    payload: Data;
    status: number | string
}

interface ErrorResponse {
    status:number;
    message:string;
}
