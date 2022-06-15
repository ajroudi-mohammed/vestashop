import useAddItem from "@vercel/commerce/customer/address/use-add-item";
export default useAddItem;
export const handler = {
    // Provide fetchOptions for SWR cache key
    fetchOptions: {
        // TODO: Revise url and query
        url: "checkout",
        query: "addPayment"
    },
    async fetcher ({ input , options , fetch  }) {},
    useHook: ({ fetch  })=>()=>async ()=>({})
};
