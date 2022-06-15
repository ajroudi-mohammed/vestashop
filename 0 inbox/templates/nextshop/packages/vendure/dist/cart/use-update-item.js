import { useCallback } from "react";
import { CommerceError, ValidationError } from "@vercel/commerce/utils/errors";
import useUpdateItem from "@vercel/commerce/cart/use-update-item";
import useCart from "./use-cart";
import { normalizeCart } from "../utils/normalize";
import { adjustOrderLineMutation } from "../utils/mutations/adjust-order-line-mutation";
export default useUpdateItem;
export const handler = {
    fetchOptions: {
        query: adjustOrderLineMutation
    },
    async fetcher (context) {
        const { input , options , fetch  } = context;
        const variables = {
            quantity: input.item.quantity || 1,
            orderLineId: input.itemId
        };
        const { adjustOrderLine  } = await fetch({
            ...options,
            variables
        });
        if (adjustOrderLine.__typename === "Order") {
            return normalizeCart(adjustOrderLine);
        }
        throw new CommerceError(adjustOrderLine);
    },
    useHook: ({ fetch  })=>{
        return (ctx = {})=>{
            const { item  } = ctx;
            const { mutate  } = useCart();
            return useCallback(async function addItem(input) {
                const itemId = item == null ? void 0 : item.id;
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
            }, [
                fetch,
                mutate
            ]);
        };
    }
};
