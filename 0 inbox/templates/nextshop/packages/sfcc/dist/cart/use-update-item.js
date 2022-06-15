import useUpdateItem from "@vercel/commerce/cart/use-update-item";
export default useUpdateItem;
export const handler = {
    fetchOptions: {
        query: ""
    },
    async fetcher ({ input , options , fetch  }) {},
    useHook: ({ fetch  })=>()=>{
            return async function addItem() {
                return {};
            };
        }
};
