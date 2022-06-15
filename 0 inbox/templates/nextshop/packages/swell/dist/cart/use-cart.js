import useCart from "@vercel/commerce/cart/use-cart";
import { useMemo } from "react";
import { normalizeCart } from "../utils/normalize";
import { checkoutCreate } from "./utils";
export default useCart;
export const handler = {
    fetchOptions: {
        query: "cart",
        method: "get"
    },
    async fetcher ({ fetch  }) {
        const cart = await checkoutCreate(fetch);
        return cart ? normalizeCart(cart) : null;
    },
    useHook: ({ useData  })=>{
        return (input)=>{
            const response = useData({
                swrOptions: {
                    revalidateOnFocus: false,
                    ...input == null ? void 0 : input.swrOptions
                }
            });
            return useMemo(()=>{
                return Object.create(response, {
                    isEmpty: {
                        get () {
                            var ref;
                            return (((ref = response.data) == null ? void 0 : ref.lineItems.length) ?? 0) <= 0;
                        },
                        enumerable: true
                    }
                });
            }, [
                response
            ]);
        };
    }
};
