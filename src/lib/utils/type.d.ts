type ApiResponse<Data extends object = { payload: Data, status; number; }> = {
    payload:Data;
    status:number;
}