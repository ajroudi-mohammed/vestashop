import useCustomer from "@vercel/commerce/customer/use-customer";
import { FetcherError } from "@vercel/commerce/utils/errors";
import normalizeUser from "../utils/normalizations/normalize-user";
import isLoggedIn from "../utils/tokens/is-logged-in";
import ensureIToken from "../utils/tokens/ensure-itoken";
export default useCustomer;
export const handler = {
    // Provide fetchOptions for SWR cache key
    fetchOptions: {
        url: "account",
        query: "get"
    },
    async fetcher ({ input , options , fetch  }) {
        console.info("useCustomer fetcher called. Configuration: ", "input: ", input, "options: ", options);
        if (!isLoggedIn()) {
            return null;
        }
        const token = ensureIToken();
        if (!token) {
            return null;
        }
        try {
            const { data: spreeAccountInfoSuccessResponse  } = await fetch({
                variables: {
                    methodPath: "account.accountInfo",
                    arguments: [
                        token
                    ]
                }
            });
            const spreeUser = spreeAccountInfoSuccessResponse.data;
            const normalizedUser = normalizeUser(spreeAccountInfoSuccessResponse, spreeUser);
            return normalizedUser;
        } catch (fetchUserError) {
            if (!(fetchUserError instanceof FetcherError) || fetchUserError.status !== 404) {
                throw fetchUserError;
            }
            return null;
        }
    },
    useHook: ({ useData  })=>{
        const useWrappedHook = (input)=>{
            return useData({
                swrOptions: {
                    revalidateOnFocus: false,
                    ...input == null ? void 0 : input.swrOptions
                }
            });
        };
        return useWrappedHook;
    }
};
