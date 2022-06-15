import { useCallback } from "react";
import useRemoveItem from "@vercel/commerce/cart/use-remove-item";
import useCart from "./use-cart";
import { checkoutToCart } from "./utils";
export default useRemoveItem;
export const handler = {
    fetchOptions: {
        query: "cart",
        method: "removeItem"
    },
    async fetcher ({ input: { itemId  } , options , fetch  }) {
        const response = await fetch({
            ...options,
            variables: [
                itemId
            ]
        });
        return checkoutToCart(response);
    },
    useHook: ({ fetch  })=>()=>{
            const { mutate  } = useCart();
            return useCallback(async function removeItem(input) {
                const data = await fetch({
                    input: {
                        itemId: input.id
                    }
                });
                await mutate(data, false);
                return data;
            }, [
                fetch,
                mutate
            ]);
        }
};
