import useAddItem from "@vercel/commerce/cart/use-add-item";
import { CommerceError } from "@vercel/commerce/utils/errors";
import { useCallback } from "react";
import useCart from "./use-cart";
import { normalizeCart } from "../utils/normalize";
import { addItemToOrderMutation } from "../utils/mutations/add-item-to-order-mutation";
export default useAddItem;
export const handler = {
    fetchOptions: {
        query: addItemToOrderMutation
    },
    async fetcher ({ input , options , fetch  }) {
        if (input.quantity && (!Number.isInteger(input.quantity) || input.quantity < 1)) {
            throw new CommerceError({
                message: "The item quantity has to be a valid integer greater than 0"
            });
        }
        const { addItemToOrder  } = await fetch({
            ...options,
            variables: {
                quantity: input.quantity || 1,
                variantId: input.variantId
            }
        });
        if (addItemToOrder.__typename === "Order") {
            return normalizeCart(addItemToOrder);
        }
        throw new CommerceError(addItemToOrder);
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
