import ApiErrorResponse from "./api-error-response";

class ApiResponseHolder<T>{
    error: ApiErrorResponse | null | undefined;
    response: T | null | undefined;

    constructor(error: ApiErrorResponse | undefined, response: T| undefined) {
        this.error = error;
        this.response = response;
    }
}

export default ApiResponseHolder;