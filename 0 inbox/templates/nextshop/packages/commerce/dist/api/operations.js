const noop = ()=>{
    throw new Error("Not implemented");
};
export const OPERATIONS = [
    "login",
    "getAllPages",
    "getPage",
    "getSiteInfo",
    "getCustomerWishlist",
    "getAllProductPaths",
    "getAllProducts",
    "getProduct", 
];
export const defaultOperations = OPERATIONS.reduce((ops, k)=>{
    ops[k] = noop;
    return ops;
}, {});
