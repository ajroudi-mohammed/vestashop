import { useMemo } from "react";
import useCommerceCart from "@vercel/commerce/cart/use-cart";
import { checkoutCreate, checkoutToCart, getCheckoutId } from "../utils";
import * as query from "../utils/queries";
export default useCommerceCart;
export const handler = {
    fetchOptions: {
        query: query.CheckoutOne
    },
    async fetcher ({ input: { cartId: checkoutId  } , options , fetch  }) {
        let checkout;
        if (checkoutId) {
            const checkoutId = getCheckoutId().checkoutToken;
            const data = await fetch({
                ...options,
                variables: {
                    checkoutId
                }
            });
            checkout = data;
        }
        if ((checkout == null ? void 0 : checkout.completedAt) || !checkoutId) {
            checkout = await checkoutCreate(fetch);
        }
        return checkoutToCart(checkout);
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
