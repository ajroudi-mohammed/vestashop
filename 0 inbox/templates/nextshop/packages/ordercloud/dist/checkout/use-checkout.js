import { useMemo } from "react";
import useCheckout from "@vercel/commerce/checkout/use-checkout";
import useSubmitCheckout from "./use-submit-checkout";
export default useCheckout;
export const handler = {
    fetchOptions: {
        url: "/api/checkout",
        method: "GET"
    },
    useHook: ({ useData  })=>{
        return function useHook(input) {
            const submit = useSubmitCheckout();
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
                            return (((ref = response.data) == null ? void 0 : (ref1 = ref.lineItems) == null ? void 0 : ref1.length) ?? 0) <= 0;
                        },
                        enumerable: true
                    },
                    submit: {
                        get () {
                            return submit;
                        },
                        enumerable: true
                    }
                });
            }, [
                response,
                submit
            ]);
        };
    }
};
