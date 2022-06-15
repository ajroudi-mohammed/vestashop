import useAddItem from "@vercel/commerce/cart/use-add-item";
import { useCallback } from "react";
import useCart from "./use-cart";
import normalizeCart from "../utils/normalizations/normalize-cart";
import { setCartToken } from "../utils/tokens/cart-token";
import ensureIToken from "../utils/tokens/ensure-itoken";
import createEmptyCart from "../utils/create-empty-cart";
import { FetcherError } from "@vercel/commerce/utils/errors";
import isLoggedIn from "../utils/tokens/is-logged-in";
export default useAddItem;
export const handler = {
    // Provide fetchOptions for SWR cache key
    fetchOptions: {
        url: "cart",
        query: "addItem"
    },
    async fetcher ({ input , options , fetch  }) {
        console.info("useAddItem fetcher called. Configuration: ", "input: ", input, "options: ", options);
        const { quantity , productId , variantId  } = input;
        const safeQuantity = quantity ?? 1;
        let token = ensureIToken();
        const addItemParameters = {
            variant_id: variantId,
            quantity: safeQuantity,
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
        if (!token) {
            const { data: spreeCartCreateSuccessResponse  } = await createEmptyCart(fetch);
            setCartToken(spreeCartCreateSuccessResponse.data.attributes.token);
            token = ensureIToken();
        }
        try {
            const { data: spreeSuccessResponse  } = await fetch({
                variables: {
                    methodPath: "cart.addItem",
                    arguments: [
                        token,
                        addItemParameters
                    ]
                }
            });
            return normalizeCart(spreeSuccessResponse, spreeSuccessResponse.data);
        } catch (addItemError) {
            if (addItemError instanceof FetcherError && addItemError.status === 404) {
                const { data: spreeRetroactiveCartCreateSuccessResponse  } = await createEmptyCart(fetch);
                if (!isLoggedIn()) {
                    setCartToken(spreeRetroactiveCartCreateSuccessResponse.data.attributes.token);
                }
                // Return an empty cart. The user has to add the item again.
                // This is going to be a rare situation.
                return normalizeCart(spreeRetroactiveCartCreateSuccessResponse, spreeRetroactiveCartCreateSuccessResponse.data);
            }
            throw addItemError;
        }
    },
    useHook: ({ fetch  })=>{
        const useWrappedHook = ()=>{
            const { mutate  } = useCart();
            return useCallback(async (input)=>{
                const data = await fetch({
                    input
                });
                await mutate(data, false);
                return data;
            }, [
                mutate
            ]);
        };
        return useWrappedHook;
    }
};
