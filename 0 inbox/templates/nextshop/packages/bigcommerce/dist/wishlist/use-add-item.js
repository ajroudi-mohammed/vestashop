import { useCallback } from "react";
import { CommerceError } from "@vercel/commerce/utils/errors";
import useAddItem from "@vercel/commerce/wishlist/use-add-item";
import useCustomer from "../customer/use-customer";
import useWishlist from "./use-wishlist";
export default useAddItem;
export const handler = {
    fetchOptions: {
        url: "/api/wishlist",
        method: "POST"
    },
    useHook: ({ fetch  })=>()=>{
            const { data: customer  } = useCustomer();
            const { mutate  } = useWishlist();
            return useCallback(async function addItem(item) {
                if (!customer) {
                    // A signed customer is required in order to have a wishlist
                    throw new CommerceError({
                        message: "Signed customer not found"
                    });
                }
                // TODO: add validations before doing the fetch
                const data = await fetch({
                    input: {
                        item
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
