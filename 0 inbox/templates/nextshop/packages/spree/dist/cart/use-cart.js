import { useMemo } from "react";
import useCart from "@vercel/commerce/cart/use-cart";
import normalizeCart from "../utils/normalizations/normalize-cart";
import { FetcherError } from "@vercel/commerce/utils/errors";
import { setCartToken } from "../utils/tokens/cart-token";
import ensureIToken from "../utils/tokens/ensure-itoken";
import isLoggedIn from "../utils/tokens/is-logged-in";
import createEmptyCart from "../utils/create-empty-cart";
import { requireConfigValue } from "../isomorphic-config";
const imagesSize = requireConfigValue("imagesSize");
const imagesQuality = requireConfigValue("imagesQuality");
export default useCart;
// This handler avoids calling /api/cart.
// There doesn't seem to be a good reason to call it.
// So far, only bigcommerce uses it.
export const handler = {
    // Provide fetchOptions for SWR cache key
    fetchOptions: {
        url: "cart",
        query: "show"
    },
    async fetcher ({ input , options , fetch  }) {
        console.info("useCart fetcher called. Configuration: ", "input: ", input, "options: ", options);
        let spreeCartResponse;
        const token = ensureIToken();
        if (!token) {
            spreeCartResponse = null;
        } else {
            try {
                const { data: spreeCartShowSuccessResponse  } = await fetch({
                    variables: {
                        methodPath: "cart.show",
                        arguments: [
                            token,
                            {
                                include: [
                                    "line_items",
                                    "line_items.variant",
                                    "line_items.variant.product",
                                    "line_items.variant.product.images",
                                    "line_items.variant.images",
                                    "line_items.variant.option_values",
                                    "line_items.variant.product.option_types", 
                                ].join(","),
                                image_transformation: {
                                    quality: imagesQuality,
                                    size: imagesSize
                                }
                            }, 
                        ]
                    }
                });
                spreeCartResponse = spreeCartShowSuccessResponse;
            } catch (fetchCartError) {
                if (!(fetchCartError instanceof FetcherError) || fetchCartError.status !== 404) {
                    throw fetchCartError;
                }
                spreeCartResponse = null;
            }
        }
        if (!spreeCartResponse || (spreeCartResponse == null ? void 0 : spreeCartResponse.data.attributes.completed_at)) {
            const { data: spreeCartCreateSuccessResponse  } = await createEmptyCart(fetch);
            spreeCartResponse = spreeCartCreateSuccessResponse;
            if (!isLoggedIn()) {
                setCartToken(spreeCartResponse.data.attributes.token);
            }
        }
        return normalizeCart(spreeCartResponse, spreeCartResponse.data);
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
                            var ref;
                            return (((ref = response.data) == null ? void 0 : ref.lineItems.length) ?? 0) === 0;
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
