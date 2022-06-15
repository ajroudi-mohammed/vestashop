import useRemoveItem from "@vercel/commerce/cart/use-remove-item";
import useCart from "./use-cart";
import { useCallback } from "react";
import normalizeCart from "../utils/normalizations/normalize-cart";
import ensureIToken from "../utils/tokens/ensure-itoken";
import createEmptyCart from "../utils/create-empty-cart";
import { setCartToken } from "../utils/tokens/cart-token";
import { FetcherError } from "@vercel/commerce/utils/errors";
import isLoggedIn from "../utils/tokens/is-logged-in";
export default useRemoveItem;
export const handler = {
    // Provide fetchOptions for SWR cache key
    fetchOptions: {
        url: "cart",
        query: "removeItem"
    },
    async fetcher ({ input , options , fetch  }) {
        console.info("useRemoveItem fetcher called. Configuration: ", "input: ", input, "options: ", options);
        const { itemId: lineItemId  } = input;
        let token = ensureIToken();
        if (!token) {
            const { data: spreeCartCreateSuccessResponse  } = await createEmptyCart(fetch);
            setCartToken(spreeCartCreateSuccessResponse.data.attributes.token);
            token = ensureIToken();
        }
        const removeItemParameters = {
            include: [
                "line_items",
                "line_items.variant",
                "line_items.variant.product",
                "line_items.variant.product.images",
                "line_items.variant.images",
                "line_items.variant.option_values",
                "line_items.variant.product.option_types", 
            ].join(",")
        };
        try {
            const { data: spreeSuccessResponse  } = await fetch({
                variables: {
                    methodPath: "cart.removeItem",
                    arguments: [
                        token,
                        lineItemId,
                        removeItemParameters
                    ]
                }
            });
            return normalizeCart(spreeSuccessResponse, spreeSuccessResponse.data);
        } catch (removeItemError) {
            if (removeItemError instanceof FetcherError && removeItemError.status === 404) {
                const { data: spreeRetroactiveCartCreateSuccessResponse  } = await createEmptyCart(fetch);
                if (!isLoggedIn()) {
                    setCartToken(spreeRetroactiveCartCreateSuccessResponse.data.attributes.token);
                }
                // Return an empty cart. This is going to be a rare situation.
                return normalizeCart(spreeRetroactiveCartCreateSuccessResponse, spreeRetroactiveCartCreateSuccessResponse.data);
            }
            throw removeItemError;
        }
    },
    useHook: ({ fetch  })=>{
        const useWrappedHook = ()=>{
            const { mutate  } = useCart();
            return useCallback(async (input)=>{
                const data = await fetch({
                    input: {
                        itemId: input.id
                    }
                });
                // Upon calling cart.removeItem, Spree returns the old version of the cart,
                // with the already removed line item. Invalidate the useCart mutation
                // to fetch the cart again.
                await mutate(data, true);
                return data;
            }, [
                mutate
            ]);
        };
        return useWrappedHook;
    }
};
