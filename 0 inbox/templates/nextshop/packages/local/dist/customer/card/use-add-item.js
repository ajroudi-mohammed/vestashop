import useAddItem from "@vercel/commerce/customer/card/use-add-item";
export default useAddItem;
export const handler = {
    fetchOptions: {
        query: ""
    },
    async fetcher ({ input , options , fetch  }) {},
    useHook: ({ fetch  })=>()=>async ()=>({})
};
