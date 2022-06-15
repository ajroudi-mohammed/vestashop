import { ValidationError } from "@vercel/commerce/utils/errors";
import debounce from "lodash.debounce";
import { useCallback } from "react";
import useUpdateItem from "@vercel/commerce/cart/use-update-item";
import { normalizeCart } from "../utils/normalize-cart";
import useCart from "./use-cart";
export default useUpdateItem;
export const handler = {
    fetchOptions: {
        query: "cart",
        method: "update"
    },
    async fetcher ({ input , options , fetch  }) {
        const variables = [
            input.itemId,
            {
                quantity: input.item.quantity
            }
        ];
        const { cart  } = await fetch({
            query: options.query,
            method: options.method,
            variables
        });
        return normalizeCart(cart);
    },
    useHook: ({ fetch  })=>{
        return (ctx = {})=>{
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const { mutate  } = useCart();
            const { item  } = ctx;
            // eslint-disable-next-line react-hooks/rules-of-hooks
            return useCallback(debounce(async (input)=>{
                const itemId = input.id ?? (item == null ? void 0 : item.id);
                const productId = input.productId ?? (item == null ? void 0 : item.productId);
                const variantId = input.productId ?? (item == null ? void 0 : item.variantId);
                const quantity = (input == null ? void 0 : input.quantity) ?? (item == null ? void 0 : item.quantity);
                if (!itemId || !productId || !variantId) {
                    throw new ValidationError({
                        message: "Invalid input for updating cart item"
                    });
                }
                const cart = await fetch({
                    input: {
                        itemId,
                        item: {
                            quantity,
                            productId,
                            variantId
                        }
                    }
                });
                await mutate(cart, false);
                return cart;
            }, ctx.wait ?? 500), [
                mutate,
                item
            ]);
        };
    }
};
