import useCart from "@vercel/commerce/cart/use-cart";
import { normalizeCart } from "../utils/normalize";
import { useMemo } from "react";
import { getCartQuery } from "../utils/queries/get-cart-query";
export default useCart;
export const handler = {
    fetchOptions: {
        query: getCartQuery
    },
    async fetcher ({ input: { cartId  } , options , fetch  }) {
        const { activeOrder  } = await fetch(options);
        return activeOrder ? normalizeCart(activeOrder) : null;
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
