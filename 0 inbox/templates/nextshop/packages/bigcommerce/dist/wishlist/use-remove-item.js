import { useCallback } from "react";
import { CommerceError } from "@vercel/commerce/utils/errors";
import useRemoveItem from "@vercel/commerce/wishlist/use-remove-item";
import useCustomer from "../customer/use-customer";
import useWishlist from "./use-wishlist";
export default useRemoveItem;
export const handler = {
    fetchOptions: {
        url: "/api/wishlist",
        method: "DELETE"
    },
    useHook: ({ fetch  })=>({ wishlist  } = {})=>{
            const { data: customer  } = useCustomer();
            const { mutate  } = useWishlist(wishlist);
            return useCallback(async function removeItem(input) {
                if (!customer) {
                    // A signed customer is required in order to have a wishlist
                    throw new CommerceError({
                        message: "Signed customer not found"
                    });
                }
                const data = await fetch({
                    input: {
                        itemId: String(input.id)
                    }
                });
                await mutate();
                return data;
            }, [
                fetch,
                mutate,
                customer
            ]);
        }
};
