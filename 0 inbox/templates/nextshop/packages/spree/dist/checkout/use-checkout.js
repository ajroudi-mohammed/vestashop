import useCheckout from "@vercel/commerce/checkout/use-checkout";
export default useCheckout;
export const handler = {
    // Provide fetchOptions for SWR cache key
    fetchOptions: {
        // TODO: Revise url and query
        url: "checkout",
        query: "show"
    },
    async fetcher ({ input , options , fetch  }) {},
    useHook: ({ useData  })=>async (input)=>({})
};
