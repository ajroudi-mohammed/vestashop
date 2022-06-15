import { useCallback } from "react";
import useUpdateItem from "@vercel/commerce/customer/card/use-update-item";
import useCards from "./use-cards";
export default useUpdateItem;
export const handler = {
    fetchOptions: {
        url: "/api/customer/card",
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
            const { mutate  } = useCards();
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
