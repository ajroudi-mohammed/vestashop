import { useCallback } from "react";
import { CommerceError } from "@vercel/commerce/utils/errors";
import useAddItem from "@vercel/commerce/cart/use-add-item";
import useCart from "./use-cart";
import * as mutation from "../utils/mutations";
import { getCheckoutId, checkoutToCart } from "../utils";
export default useAddItem;
export const handler = {
    fetchOptions: {
        query: mutation.CheckoutLineAdd
    },
    async fetcher ({ input: item , options , fetch  }) {
        if (item.quantity && (!Number.isInteger(item.quantity) || item.quantity < 1)) {
            throw new CommerceError({
                message: "The item quantity has to be a valid integer greater than 0"
            });
        }
        const { checkoutLinesAdd  } = await fetch({
            ...options,
            variables: {
                checkoutId: getCheckoutId().checkoutId,
                lineItems: [
                    {
                        variantId: item.variantId,
                        quantity: item.quantity ?? 1
                    }, 
                ]
            }
        });
        return checkoutToCart(checkoutLinesAdd);
    },
    useHook: ({ fetch  })=>()=>{
            const { mutate  } = useCart();
            return useCallback(async function addItem(input) {
                const data = await fetch({
                    input
                });
                await mutate(data, false);
                return data;
            }, [
                fetch,
                mutate
            ]);
        }
};
