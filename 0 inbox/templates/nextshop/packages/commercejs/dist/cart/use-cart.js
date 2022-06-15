import { useMemo } from "react";
import useCart from "@vercel/commerce/cart/use-cart";
import { normalizeCart } from "../utils/normalize-cart";
export default useCart;
export const handler = {
    fetchOptions: {
        query: "cart",
        method: "retrieve"
    },
    async fetcher ({ options , fetch  }) {
        const cart = await fetch({
            query: options.query,
            method: options.method
        });
        return normalizeCart(cart);
    },
    useHook: ({ useData  })=>{
        return function useHook(input) {
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
                            var ref, ref1;
                            return (((ref = response.data) == null ? void 0 : (ref1 = ref.lineItems) == null ? void 0 : ref1.length) ?? 0) <= 0;
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
