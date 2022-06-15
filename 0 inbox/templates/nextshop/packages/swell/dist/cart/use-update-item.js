import { useCallback } from "react";
import debounce from "lodash.debounce";
import { ValidationError } from "@vercel/commerce/utils/errors";
// import useUpdateItem, {
//   UpdateItemInput as UpdateItemInputBase,
//   UseUpdateItem,
// } from '@vercel/commerce/cart/use-update-item'
import useUpdateItem from "@vercel/commerce/cart/use-update-item";
import useCart from "./use-cart";
import { handler as removeItemHandler } from "./use-remove-item";
import { checkoutToCart } from "./utils";
// export type UpdateItemInput<T = any> = T extends LineItem
//   ? Partial<UpdateItemInputBase<LineItem>>
//   : UpdateItemInputBase<LineItem>
export default useUpdateItem;
export const handler = {
    fetchOptions: {
        query: "cart",
        method: "updateItem"
    },
    async fetcher ({ input: { itemId , item  } , options , fetch  }) {
        if (Number.isInteger(item.quantity)) {
            // Also allow the update hook to remove an item if the quantity is lower than 1
            if (item.quantity < 1) {
                return removeItemHandler.fetcher({
                    options: removeItemHandler.fetchOptions,
                    input: {
                        itemId
                    },
                    fetch
                });
            }
        } else if (item.quantity) {
            throw new ValidationError({
                message: "The item quantity has to be a valid integer"
            });
        }
        const response = await fetch({
            ...options,
            variables: [
                itemId,
                {
                    quantity: item.quantity
                }
            ]
        });
        return checkoutToCart(response);
    },
    useHook: ({ fetch  })=>{
        return (ctx = {})=>{
            const { item  } = ctx;
            const { mutate , data: cartData  } = useCart();
            return useCallback(debounce(async (input)=>{
                const firstLineItem = cartData.lineItems[0];
                const itemId = (item == null ? void 0 : item.id) || firstLineItem.id;
                const productId = (item == null ? void 0 : item.productId) || firstLineItem.productId;
                const variantId = (item == null ? void 0 : item.variant.id) || firstLineItem.variant.id;
                if (!itemId || !productId) {
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
            }, ctx.wait ?? 500), [
                fetch,
                mutate
            ]);
        };
    }
};
