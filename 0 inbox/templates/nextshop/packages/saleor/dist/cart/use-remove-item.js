import { useCallback } from "react";
import useRemoveItem from "@vercel/commerce/cart/use-remove-item";
import useCart from "./use-cart";
import * as mutation from "../utils/mutations";
import { getCheckoutId, checkoutToCart } from "../utils";
export default useRemoveItem;
export const handler = {
    fetchOptions: {
        query: mutation.CheckoutLineDelete
    },
    async fetcher ({ input: { itemId  } , options , fetch  }) {
        const data = await fetch({
            ...options,
            variables: {
                checkoutId: getCheckoutId().checkoutId,
                lineId: itemId
            }
        });
        return checkoutToCart(data.checkoutLineDelete);
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
