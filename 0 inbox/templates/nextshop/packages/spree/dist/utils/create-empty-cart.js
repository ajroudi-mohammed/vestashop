import ensureIToken from "./tokens/ensure-itoken";
const createEmptyCart = (fetch)=>{
    const token = ensureIToken();
    return fetch({
        variables: {
            methodPath: "cart.create",
            arguments: [
                token
            ]
        }
    });
};
export default createEmptyCart;
