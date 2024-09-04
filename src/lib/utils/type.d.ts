interface ApiResponse<Data extends object >{
    payload: Data;
    status: number
}

interface ErrorResponse {
    status:number;
    message:string;
}
