import isAllowedMethod from "./is-allowed-method";
export default function isAllowedOperation(req, res, allowedOperations) {
    const methods = Object.keys(allowedOperations);
    const allowedMethods = methods.reduce((arr, method)=>{
        if (allowedOperations[method]) {
            arr.push(method);
        }
        return arr;
    }, []);
    return isAllowedMethod(req, res, allowedMethods);
};
