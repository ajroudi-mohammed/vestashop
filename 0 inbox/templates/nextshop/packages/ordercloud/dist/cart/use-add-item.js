import { useCallback } from "react";
import { CommerceError } from "@vercel/commerce/utils/errors";
import useAddItem from "@vercel/commerce/cart/use-add-item";
import useCart from "./use-cart";
export default useAddItem;
export const handler = {
    fetchOptions: {
        url: "/api/cart",
        method: "POST"
    },
    async fetcher ({ input: item , options , fetch  }) {
        if (item.quantity && (!Number.isInteger(item.quantity) || item.quantity < 1)) {
            throw new CommerceError({
                message: "The item quantity has to be a valid integer greater than 0"
            });
        }
        const data = await fetch({
            ...options,
            body: {
                item
            }
        });
        return data;
    },
    useHook: ({ fetch  })=>function useHook() {
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
