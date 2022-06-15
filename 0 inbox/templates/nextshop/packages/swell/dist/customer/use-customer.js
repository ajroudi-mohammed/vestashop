import useCustomer from "@vercel/commerce/customer/use-customer";
import { normalizeCustomer } from "../utils/normalize";
export default useCustomer;
export const handler = {
    fetchOptions: {
        query: "account",
        method: "get"
    },
    async fetcher ({ options , fetch  }) {
        const data = await fetch({
            ...options
        });
        return data ? normalizeCustomer(data) : null;
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
