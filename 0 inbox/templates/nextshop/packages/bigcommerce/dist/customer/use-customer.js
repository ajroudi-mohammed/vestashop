import useCustomer from "@vercel/commerce/customer/use-customer";
export default useCustomer;
export const handler = {
    fetchOptions: {
        url: "/api/customer",
        method: "GET"
    },
    async fetcher ({ options , fetch  }) {
        const data = await fetch(options);
        return (data == null ? void 0 : data.customer) ?? null;
    },
    useHook: ({ useData  })=>{
        return (input)=>{
            return useData({
                swrOptions: {
                    revalidateOnFocus: false,
                    ...input == null ? void 0 : input.swrOptions
                }
            });
        };
    }
};
