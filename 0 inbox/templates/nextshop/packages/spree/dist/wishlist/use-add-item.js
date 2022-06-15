import { useCallback } from "react";
import useAddItem from "@vercel/commerce/wishlist/use-add-item";
import useWishlist from "./use-wishlist";
import ensureIToken from "../utils/tokens/ensure-itoken";
import isLoggedIn from "../utils/tokens/is-logged-in";
export default useAddItem;
export const handler = {
    fetchOptions: {
        url: "wishlists",
        query: "addWishedItem"
    },
    async fetcher ({ input , options , fetch  }) {
        console.info("useAddItem (wishlist) fetcher called. Configuration: ", "input: ", input, "options: ", options);
        const { item: { productId , variantId , wishlistToken  } ,  } = input;
        if (!isLoggedIn() || !wishlistToken) {
            return null;
        }
        let token = ensureIToken();
        const addItemParameters = {
            variant_id: `${variantId}`,
            quantity: 1
        };
        await fetch({
            variables: {
                methodPath: "wishlists.addWishedItem",
                arguments: [
                    token,
                    wishlistToken,
                    addItemParameters
                ]
            }
        });
        return null;
    },
    useHook: ({ fetch  })=>{
        const useWrappedHook = ()=>{
            const wishlist = useWishlist();
            return useCallback(async (item)=>{
                if (!wishlist.data) {
                    return null;
                }
                const data = await fetch({
                    input: {
                        item: {
                            ...item,
                            wishlistToken: wishlist.data.token
                        }
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
