class ApiErrorResponse{
    id: string;
    fields: [string];
    message: string;


    constructor(response: any){
        this.id = response?.response?.data?.id;
        this.fields = response?.response?.data?.fields;
        this.message = response?.response?.data?.message;
    }
}

export default ApiErrorResponse;