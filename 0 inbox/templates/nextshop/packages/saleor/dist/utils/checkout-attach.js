import * as mutation from "./mutations";
export const checkoutAttach = async (fetch, { variables , headers  })=>{
    const data = await fetch({
        query: mutation.CheckoutAttach,
        variables,
        headers
    });
    return data;
};
