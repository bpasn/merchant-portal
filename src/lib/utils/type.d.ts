interface ApiResponse<Data extends object >{
    payload: Data;
    status: number | string
}

interface ErrorResponse {
    status:number;
    message:string;
}

enum HttpStatus {
    OK=200,
    BAD_REQUEST=400,
    INTERNAL_SERVER_ERROR=500,
    NOT_FOUND=404
}