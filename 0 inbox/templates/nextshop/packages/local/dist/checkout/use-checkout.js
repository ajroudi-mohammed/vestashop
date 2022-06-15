import useCheckout from "@vercel/commerce/checkout/use-checkout";
export default useCheckout;
export const handler = {
    fetchOptions: {
        query: ""
    },
    async fetcher ({ input , options , fetch  }) {},
    useHook: ({ useData  })=>async (input)=>({})
};
