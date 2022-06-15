import { useCallback } from "react";
import useAddItem from "@vercel/commerce/cart/use-add-item";
import { normalizeCart } from "../utils/normalize-cart";
import useCart from "./use-cart";
export default useAddItem;
export const handler = {
    fetchOptions: {
        query: "cart",
        method: "add"
    },
    async fetcher ({ input: item , options , fetch  }) {
        // Frontend stringifies variantId even if undefined.
        const hasVariant = !item.variantId || item.variantId !== "undefined";
        const variables = [
            item.productId,
            (item == null ? void 0 : item.quantity) || 1
        ];
        if (hasVariant) {
            variables.push(item.variantId);
        }
        const { cart  } = await fetch({
            query: options.query,
            method: options.method,
            variables
        });
        return normalizeCart(cart);
    },
    useHook: ({ fetch  })=>function useHook() {
            const { mutate  } = useCart();
            return useCallback(async function addItem(input) {
                const cart = await fetch({
                    input
                });
                await mutate(cart, false);
                return cart;
            }, [
                mutate
            ]);
        }
};
