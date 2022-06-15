import useCustomer from "@vercel/commerce/customer/use-customer";
import { activeCustomerQuery } from "../utils/queries/active-customer-query";
export default useCustomer;
export const handler = {
    fetchOptions: {
        query: activeCustomerQuery
    },
    async fetcher ({ options , fetch  }) {
        const { activeCustomer  } = await fetch({
            ...options
        });
        return activeCustomer ? {
            firstName: activeCustomer.firstName ?? "",
            lastName: activeCustomer.lastName ?? "",
            email: activeCustomer.emailAddress ?? ""
        } : null;
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
