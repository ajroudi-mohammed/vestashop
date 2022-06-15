import { useCallback } from "react";
import useRemoveItem from "@vercel/commerce/cart/use-remove-item";
import { CommerceError } from "@vercel/commerce/utils/errors";
import useCart from "./use-cart";
import { normalizeCart } from "../utils/normalize";
import { removeOrderLineMutation } from "../utils/mutations/remove-order-line-mutation";
export default useRemoveItem;
export const handler = {
    fetchOptions: {
        query: removeOrderLineMutation
    },
    async fetcher ({ input , options , fetch  }) {
        const variables = {
            orderLineId: input.itemId
        };
        const { removeOrderLine  } = await fetch({
            ...options,
            variables
        });
        if (removeOrderLine.__typename === "Order") {
            return normalizeCart(removeOrderLine);
        }
        throw new CommerceError(removeOrderLine);
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
