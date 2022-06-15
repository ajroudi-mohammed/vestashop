import useAddItem from "@vercel/commerce/customer/address/use-add-item";
export default useAddItem;
export const handler = {
    fetchOptions: {
        query: ""
    },
    async fetcher ({ input , options , fetch  }) {},
    useHook: ({ fetch  })=>()=>async ()=>({})
};
