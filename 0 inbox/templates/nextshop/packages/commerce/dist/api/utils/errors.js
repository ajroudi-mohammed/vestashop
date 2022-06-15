export class CommerceAPIError extends Error {
    constructor(msg, res, data){
        super(msg);
        this.name = "CommerceApiError";
        this.status = res.status;
        this.res = res;
        this.data = data;
    }
}
export class CommerceNetworkError extends Error {
    constructor(msg){
        super(msg);
        this.name = "CommerceNetworkError";
    }
}
