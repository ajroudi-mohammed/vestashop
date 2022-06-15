import { useMemo } from "react";
import useWishlist from "@vercel/commerce/wishlist/use-wishlist";
import ensureIToken from "../utils/tokens/ensure-itoken";
import normalizeWishlist from "../utils/normalizations/normalize-wishlist";
import isLoggedIn from "../utils/tokens/is-logged-in";
export default useWishlist;
export const handler = {
    // Provide fetchOptions for SWR cache key
    fetchOptions: {
        url: "wishlists",
        query: "default"
    },
    async fetcher ({ input , options , fetch  }) {
        console.info("useWishlist fetcher called. Configuration: ", "input: ", input, "options: ", options);
        if (!isLoggedIn()) {
            return null;
        }
        // TODO: Optimize with includeProducts.
        const token = ensureIToken();
        const { data: spreeWishlistsDefaultSuccessResponse  } = await fetch({
            variables: {
                methodPath: "wishlists.default",
                arguments: [
                    token,
                    {
                        include: [
                            "wished_items",
                            "wished_items.variant",
                            "wished_items.variant.product",
                            "wished_items.variant.product.primary_variant",
                            "wished_items.variant.product.images",
                            "wished_items.variant.product.option_types",
                            "wished_items.variant.product.variants",
                            "wished_items.variant.product.variants.option_values", 
                        ].join(",")
                    }, 
                ]
            }
        });
        return normalizeWishlist(spreeWishlistsDefaultSuccessResponse, spreeWishlistsDefaultSuccessResponse.data);
    },
    useHook: ({ useData  })=>{
        const useWrappedHook = (input)=>{
            const response = useData({
                swrOptions: {
                    revalidateOnFocus: false,
                    ...input == null ? void 0 : input.swrOptions
                }
            });
            return useMemo(()=>{
                return Object.create(response, {
                    isEmpty: {
                        get () {
                            var ref, ref1;
                            return (((ref = response.data) == null ? void 0 : (ref1 = ref.items) == null ? void 0 : ref1.length) || 0) <= 0;
                        },
                        enumerable: true
                    }
                });
            }, [
                response
            ]);
        };
        return useWrappedHook;
    }
};
