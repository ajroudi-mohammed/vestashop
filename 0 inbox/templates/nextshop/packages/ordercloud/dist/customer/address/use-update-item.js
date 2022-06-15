import { useCallback } from "react";
import useUpdateItem from "@vercel/commerce/customer/address/use-update-item";
import useAddresses from "./use-addresses";
export default useUpdateItem;
export const handler = {
    fetchOptions: {
        url: "/api/customer/address",
        method: "PUT"
    },
    async fetcher ({ input: { itemId , item  } , options , fetch  }) {
        return await fetch({
            ...options,
            body: {
                itemId,
                item
            }
        });
    },
    useHook: ({ fetch  })=>function useHook() {
            const { mutate  } = useAddresses();
            return useCallback(async function updateItem(input) {
                const data = await fetch({
                    input
                });
                await mutate([], false);
                return data;
            }, [
                fetch,
                mutate
            ]);
        }
};
