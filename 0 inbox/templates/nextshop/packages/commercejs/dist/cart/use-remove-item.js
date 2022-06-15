import { useCallback } from "react";
import useRemoveItem from "@vercel/commerce/cart/use-remove-item";
import { normalizeCart } from "../utils/normalize-cart";
import useCart from "./use-cart";
export default useRemoveItem;
export const handler = {
    fetchOptions: {
        query: "cart",
        method: "remove"
    },
    async fetcher ({ input , options , fetch  }) {
        const { cart  } = await fetch({
            query: options.query,
            method: options.method,
            variables: input.itemId
        });
        return normalizeCart(cart);
    },
    useHook: ({ fetch  })=>function useHook() {
            const { mutate  } = useCart();
            return useCallback(async function removeItem(input) {
                const cart = await fetch({
                    input: {
                        itemId: input.id
                    }
                });
                await mutate(cart, false);
                return cart;
            }, [
                mutate
            ]);
        }
};
