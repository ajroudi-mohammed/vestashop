import { useMemo } from "react";
import useCommerceCart from "@vercel/commerce/cart/use-cart";
import { checkoutToCart } from "../utils";
import getCheckoutQuery from "../utils/queries/get-checkout-query";
import Cookies from "js-cookie";
import { SHOPIFY_CHECKOUT_ID_COOKIE, SHOPIFY_CHECKOUT_URL_COOKIE } from "../const";
export default useCommerceCart;
export const handler = {
    fetchOptions: {
        query: getCheckoutQuery
    },
    async fetcher ({ input: { cartId  } , options , fetch  }) {
        if (cartId) {
            const { node: checkout  } = await fetch({
                ...options,
                variables: {
                    checkoutId: cartId
                }
            });
            if (checkout == null ? void 0 : checkout.completedAt) {
                Cookies.remove(SHOPIFY_CHECKOUT_ID_COOKIE);
                Cookies.remove(SHOPIFY_CHECKOUT_URL_COOKIE);
                return null;
            } else {
                return checkoutToCart({
                    checkout
                });
            }
        }
        return null;
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
