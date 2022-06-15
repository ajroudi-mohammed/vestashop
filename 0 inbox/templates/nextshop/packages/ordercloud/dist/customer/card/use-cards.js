import { useMemo } from "react";
import useCard from "@vercel/commerce/customer/card/use-cards";
export default useCard;
export const handler = {
    fetchOptions: {
        url: "/api/customer/card",
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
