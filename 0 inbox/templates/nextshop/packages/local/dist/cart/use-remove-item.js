import useRemoveItem from "@vercel/commerce/cart/use-remove-item";
export default useRemoveItem;
export const handler = {
    fetchOptions: {
        query: ""
    },
    async fetcher ({ input , options , fetch  }) {},
    useHook: ({ fetch  })=>()=>{
            return async function removeItem(input) {
                return {};
            };
        }
};
