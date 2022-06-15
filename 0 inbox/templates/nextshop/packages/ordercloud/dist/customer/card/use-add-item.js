import { useCallback } from "react";
import useAddItem from "@vercel/commerce/customer/card/use-add-item";
import useCards from "./use-cards";
export default useAddItem;
export const handler = {
    fetchOptions: {
        url: "/api/customer/card",
        method: "POST"
    },
    async fetcher ({ input: item , options , fetch  }) {
        const data = await fetch({
            ...options,
            body: {
                item
            }
        });
        return data;
    },
    useHook: ({ fetch  })=>function useHook() {
            const { mutate  } = useCards();
            return useCallback(async function addItem(input) {
                const data = await fetch({
                    input
                });
                await mutate([
                    data
                ], false);
                return data;
            }, [
                fetch,
                mutate
            ]);
        }
};
