import useUpdateItem from "@vercel/commerce/cart/use-update-item";
import useCart from "./use-cart";
import { useMemo } from "react";
import { FetcherError, ValidationError } from "@vercel/commerce/utils/errors";
import normalizeCart from "../utils/normalizations/normalize-cart";
import debounce from "lodash.debounce";
import ensureIToken from "../utils/tokens/ensure-itoken";
import createEmptyCart from "../utils/create-empty-cart";
import { setCartToken } from "../utils/tokens/cart-token";
import isLoggedIn from "../utils/tokens/is-logged-in";
export default useUpdateItem;
export const handler = {
    // Provide fetchOptions for SWR cache key
    fetchOptions: {
        url: "cart",
        query: "setQuantity"
    },
    async fetcher ({ input , options , fetch  }) {
        console.info("useRemoveItem fetcher called. Configuration: ", "input: ", input, "options: ", options);
        const { itemId , item  } = input;
        if (!item.quantity) {
            throw new ValidationError({
                message: "Line item quantity needs to be provided."
            });
        }
        let token = ensureIToken();
        if (!token) {
            const { data: spreeCartCreateSuccessResponse  } = await createEmptyCart(fetch);
            setCartToken(spreeCartCreateSuccessResponse.data.attributes.token);
            token = ensureIToken();
        }
        try {
            const setQuantityParameters = {
                line_item_id: itemId,
                quantity: item.quantity,
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
            const { data: spreeSuccessResponse  } = await fetch({
                variables: {
                    methodPath: "cart.setQuantity",
                    arguments: [
                        token,
                        setQuantityParameters
                    ]
                }
            });
            return normalizeCart(spreeSuccessResponse, spreeSuccessResponse.data);
        } catch (updateItemError) {
            if (updateItemError instanceof FetcherError && updateItemError.status === 404) {
                const { data: spreeRetroactiveCartCreateSuccessResponse  } = await createEmptyCart(fetch);
                if (!isLoggedIn()) {
                    setCartToken(spreeRetroactiveCartCreateSuccessResponse.data.attributes.token);
                }
                // Return an empty cart. The user has to update the item again.
                // This is going to be a rare situation.
                return normalizeCart(spreeRetroactiveCartCreateSuccessResponse, spreeRetroactiveCartCreateSuccessResponse.data);
            }
            throw updateItemError;
        }
    },
    useHook: ({ fetch  })=>{
        const useWrappedHook = (context)=>{
            const { mutate  } = useCart();
            return useMemo(()=>{
                return debounce(async (input)=>{
                    var ref, ref1, ref2;
                    const itemId = context == null ? void 0 : (ref = context.item) == null ? void 0 : ref.id;
                    const productId = input.productId ?? (context == null ? void 0 : (ref1 = context.item) == null ? void 0 : ref1.productId);
                    const variantId = input.variantId ?? (context == null ? void 0 : (ref2 = context.item) == null ? void 0 : ref2.variantId);
                    const quantity = input.quantity;
                    if (!itemId || !productId || !variantId) {
                        throw new ValidationError({
                            message: "Invalid input used for this operation"
                        });
                    }
                    const data = await fetch({
                        input: {
                            item: {
                                productId,
                                variantId,
                                quantity
                            },
                            itemId
                        }
                    });
                    await mutate(data, false);
                    return data;
                }, (context == null ? void 0 : context.wait) ?? 500);
            }, [
                mutate,
                context
            ]);
        };
        return useWrappedHook;
    }
};
