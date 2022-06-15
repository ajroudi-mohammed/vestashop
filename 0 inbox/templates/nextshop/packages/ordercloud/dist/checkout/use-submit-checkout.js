import { useCallback } from "react";
import useSubmitCheckout from "@vercel/commerce/checkout/use-submit-checkout";
export default useSubmitCheckout;
export const handler = {
    fetchOptions: {
        url: "/api/checkout",
        method: "POST"
    },
    async fetcher ({ input: item , options , fetch  }) {
        // @TODO: Make form validations in here, import generic error like import { CommerceError } from '@vercel/commerce/utils/errors'
        // Get payment and delivery information in here
        const data = await fetch({
            ...options,
            body: {
                item
            }
        });
        return data;
    },
    useHook: ({ fetch  })=>function useHook() {
            return useCallback(async function onSubmitCheckout(input) {
                const data = await fetch({
                    input
                });
                return data;
            }, [
                fetch
            ]);
        }
};
