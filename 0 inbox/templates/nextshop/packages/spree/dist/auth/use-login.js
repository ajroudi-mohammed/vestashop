import { useCallback } from "react";
import useLogin from "@vercel/commerce/auth/use-login";
import { FetcherError, ValidationError } from "@vercel/commerce/utils/errors";
import useCustomer from "../customer/use-customer";
import useCart from "../cart/use-cart";
import useWishlist from "../wishlist/use-wishlist";
import login from "../utils/login";
export default useLogin;
export const handler = {
    // Provide fetchOptions for SWR cache key
    fetchOptions: {
        url: "authentication",
        query: "getToken"
    },
    async fetcher ({ input , options , fetch  }) {
        console.info("useLogin fetcher called. Configuration: ", "input: ", input, "options: ", options);
        const { email , password  } = input;
        if (!email || !password) {
            throw new ValidationError({
                message: "Email and password need to be provided."
            });
        }
        const getTokenParameters = {
            username: email,
            password
        };
        try {
            await login(fetch, getTokenParameters, false);
            return null;
        } catch (getTokenError) {
            if (getTokenError instanceof FetcherError && getTokenError.status === 400) {
                // Change the error message to be more user friendly.
                throw new FetcherError({
                    status: getTokenError.status,
                    message: "The email or password is invalid.",
                    code: getTokenError.code
                });
            }
            throw getTokenError;
        }
    },
    useHook: ({ fetch  })=>{
        const useWrappedHook = ()=>{
            const customer = useCustomer();
            const cart = useCart();
            const wishlist = useWishlist();
            return useCallback(async function login(input) {
                const data = await fetch({
                    input
                });
                await customer.mutate();
                await cart.mutate();
                await wishlist.mutate();
                return data;
            }, [
                customer,
                cart,
                wishlist
            ]);
        };
        return useWrappedHook;
    }
};
