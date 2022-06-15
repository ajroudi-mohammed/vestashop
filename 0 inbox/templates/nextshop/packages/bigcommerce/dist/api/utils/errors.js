// Used for GraphQL errors
export class BigcommerceGraphQLError extends Error {
}
export class BigcommerceApiError extends Error {
    constructor(msg, res, data){
        super(msg);
        this.name = "BigcommerceApiError";
        this.status = res.status;
        this.res = res;
        this.data = data;
    }
}
export class BigcommerceNetworkError extends Error {
    constructor(msg){
        super(msg);
        this.name = "BigcommerceNetworkError";
    }
}
