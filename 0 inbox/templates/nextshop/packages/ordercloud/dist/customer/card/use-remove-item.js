import { useCallback } from "react";
import { ValidationError } from "@vercel/commerce/utils/errors";
import useRemoveItem from "@vercel/commerce/customer/card/use-remove-item";
import useCards from "./use-cards";
export default useRemoveItem;
export const handler = {
    fetchOptions: {
        url: "/api/customer/card",
        method: "DELETE"
    },
    async fetcher ({ input: { itemId  } , options , fetch  }) {
        return await fetch({
            ...options,
            body: {
                itemId
            }
        });
    },
    useHook: ({ fetch  })=>{
        return function useHook(ctx = {}) {
            const { item  } = ctx;
            const { mutate  } = useCards();
            const removeItem = async (input)=>{
                const itemId = (input == null ? void 0 : input.id) ?? (item == null ? void 0 : item.id);
                if (!itemId) {
                    throw new ValidationError({
                        message: "Invalid input used for this operation"
                    });
                }
                const data = await fetch({
                    input: {
                        itemId
                    }
                });
                await mutate([], false);
                return data;
            };
            return useCallback(removeItem, [
                fetch,
                mutate
            ]);
        };
    }
};
