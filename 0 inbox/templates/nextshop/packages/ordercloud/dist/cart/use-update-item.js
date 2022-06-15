import { useCallback } from "react";
import debounce from "lodash.debounce";
import { ValidationError } from "@vercel/commerce/utils/errors";
import useUpdateItem from "@vercel/commerce/cart/use-update-item";
import { handler as removeItemHandler } from "./use-remove-item";
import useCart from "./use-cart";
export default useUpdateItem;
export const handler = {
    fetchOptions: {
        url: "/api/cart",
        method: "PUT"
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
        return await fetch({
            ...options,
            body: {
                itemId,
                item
            }
        });
    },
    useHook: ({ fetch  })=>{
        return function useHook(ctx = {}) {
            const { item  } = ctx;
            const { mutate  } = useCart();
            return useCallback(debounce(async (input)=>{
                const itemId = input.id ?? (item == null ? void 0 : item.id);
                const productId = input.productId ?? (item == null ? void 0 : item.productId);
                const variantId = input.productId ?? (item == null ? void 0 : item.variantId);
                if (!itemId || !productId) {
                    throw new ValidationError({
                        message: "Invalid input used for this operation"
                    });
                }
                const data = await fetch({
                    input: {
                        itemId,
                        item: {
                            productId,
                            variantId: variantId || "",
                            quantity: input.quantity
                        }
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
