import useCustomer from "@vercel/commerce/customer/use-customer";
import * as query from "../utils/queries";
export default useCustomer;
export const handler = {
    fetchOptions: {
        query: query.CustomerCurrent
    },
    async fetcher ({ options , fetch  }) {
        const data = await fetch({
            ...options,
            variables: {}
        });
        return data.me ?? null;
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
