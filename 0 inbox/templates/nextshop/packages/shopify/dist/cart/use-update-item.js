import { useCallback } from "react";
import debounce from "lodash.debounce";
import { ValidationError } from "@vercel/commerce/utils/errors";
import useUpdateItem from "@vercel/commerce/cart/use-update-item";
import useCart from "./use-cart";
import { handler as removeItemHandler } from "./use-remove-item";
import { getCheckoutId, checkoutLineItemUpdateMutation, checkoutToCart } from "../utils";
export default useUpdateItem;
export const handler = {
    fetchOptions: {
        query: checkoutLineItemUpdateMutation
    },
    async fetcher ({ input: { itemId , item  } , options , fetch  }) {
        if (Number.isInteger(item.quantity)) {
            // Also allow the update hook to remove an item if the quantity is lower than 1
            if (item.quantity < 1) {
                return removeItemHandler.fetcher({
                    options: removeItemHandler.fetchOptions,
                    input: {
                        itemId
                    },
                    fetch
                });
            }
        } else if (item.quantity) {
            throw new ValidationError({
                message: "The item quantity has to be a valid integer"
            });
        }
        const { checkoutLineItemsUpdate  } = await fetch({
            ...options,
            variables: {
                checkoutId: getCheckoutId(),
                lineItems: [
                    {
                        id: itemId,
                        quantity: item.quantity
                    }, 
                ]
            }
        });
        return checkoutToCart(checkoutLineItemsUpdate);
    },
    useHook: ({ fetch  })=>{
        return (ctx = {})=>{
            const { item  } = ctx;
            const { mutate  } = useCart();
            return useCallback(debounce(async (input)=>{
                const itemId = input.id ?? (item == null ? void 0 : item.id);
                const productId = input.productId ?? (item == null ? void 0 : item.productId);
                const variantId = input.productId ?? (item == null ? void 0 : item.variantId);
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
                            quantity: input.quantity
                        },
                        itemId
                    }
                });
                await mutate(data, false);
                return data;
            }, ctx.wait ?? 500), [
                fetch,
                mutate
            ]);
        };
    }
};
