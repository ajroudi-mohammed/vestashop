import { useMemo } from "react";
import useCart from "@vercel/commerce/cart/use-cart";
export default useCart;
export const handler = {
    fetchOptions: {
        query: ""
    },
    async fetcher () {
        return {
            id: "",
            createdAt: "",
            currency: {
                code: ""
            },
            taxesIncluded: "",
            lineItems: [],
            lineItemsSubtotalPrice: "",
            subtotalPrice: 0,
            totalPrice: 0
        };
    },
    useHook: ({ useData  })=>(input)=>{
            return useMemo(()=>Object.create({}, {
                    isEmpty: {
                        get () {
                            return true;
                        },
                        enumerable: true
                    }
                }), []);
        }
};
