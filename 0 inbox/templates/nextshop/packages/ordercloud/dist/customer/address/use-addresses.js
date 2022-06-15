import { useMemo } from "react";
import useAddresses from "@vercel/commerce/customer/address/use-addresses";
export default useAddresses;
export const handler = {
    fetchOptions: {
        url: "/api/customer/address",
        method: "GET"
    },
    useHook: ({ useData  })=>{
        return function useHook(input) {
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
                            return (((ref = response.data) == null ? void 0 : ref.length) ?? 0) <= 0;
                        },
                        enumerable: true
                    }
                });
            }, [
                response
            ]);
        };
    }
};
