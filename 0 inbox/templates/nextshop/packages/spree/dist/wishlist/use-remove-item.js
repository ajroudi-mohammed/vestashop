import { useCallback } from "react";
import useRemoveItem from "@vercel/commerce/wishlist/use-remove-item";
import useWishlist from "./use-wishlist";
import isLoggedIn from "../utils/tokens/is-logged-in";
import ensureIToken from "../utils/tokens/ensure-itoken";
export default useRemoveItem;
export const handler = {
    fetchOptions: {
        url: "wishlists",
        query: "removeWishedItem"
    },
    async fetcher ({ input , options , fetch  }) {
        console.info("useRemoveItem (wishlist) fetcher called. Configuration: ", "input: ", input, "options: ", options);
        const { itemId , wishlistToken  } = input;
        if (!isLoggedIn() || !wishlistToken) {
            return null;
        }
        let token = ensureIToken();
        await fetch({
            variables: {
                methodPath: "wishlists.removeWishedItem",
                arguments: [
                    token,
                    wishlistToken,
                    itemId
                ]
            }
        });
        return null;
    },
    useHook: ({ fetch  })=>{
        const useWrappedHook = ()=>{
            const wishlist = useWishlist();
            return useCallback(async (input)=>{
                if (!wishlist.data) {
                    return null;
                }
                const data = await fetch({
                    input: {
                        itemId: `${input.id}`,
                        wishlistToken: wishlist.data.token
                    }
                });
                await wishlist.mutate();
                return data;
            }, [
                wishlist
            ]);
        };
        return useWrappedHook;
    }
};
