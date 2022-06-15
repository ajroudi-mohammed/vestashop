import useAddItem from "@vercel/commerce/cart/use-add-item";
export default useAddItem;
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
