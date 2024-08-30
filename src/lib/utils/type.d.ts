type ApiResponse<Data extends object> = {
    payload: Data;
    status: number
}