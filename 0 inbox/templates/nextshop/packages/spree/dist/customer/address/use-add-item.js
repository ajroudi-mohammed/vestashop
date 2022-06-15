import useAddItem from "@vercel/commerce/customer/address/use-add-item";
export default useAddItem;
export const handler = {
    // Provide fetchOptions for SWR cache key
    fetchOptions: {
        url: "account",
        query: "createAddress"
    },
    async fetcher ({ input , options , fetch  }) {},
    useHook: ({ fetch  })=>()=>async ()=>({})
};
