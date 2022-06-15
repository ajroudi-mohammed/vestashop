import Cookies from "js-cookie";
import { decode } from "jsonwebtoken";
import useCustomer from "@vercel/commerce/customer/use-customer";
import { CUSTOMER_COOKIE, API_URL } from "../constants";
export default useCustomer;
export const handler = {
    fetchOptions: {
        query: "customer",
        method: "_request"
    },
    async fetcher ({ options , fetch  }) {
        const token = Cookies.get(CUSTOMER_COOKIE);
        if (!token) {
            return null;
        }
        const decodedToken = decode(token);
        const customer = await fetch({
            query: options.query,
            method: options.method,
            variables: [
                `${API_URL}/customers/${decodedToken.cid}`,
                "get",
                null,
                {},
                token, 
            ]
        });
        return customer;
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
