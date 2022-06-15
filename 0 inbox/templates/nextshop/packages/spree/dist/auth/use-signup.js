import { useCallback } from "react";
import useSignup from "@vercel/commerce/auth/use-signup";
import { ValidationError } from "@vercel/commerce/utils/errors";
import useCustomer from "../customer/use-customer";
import useCart from "../cart/use-cart";
import useWishlist from "../wishlist/use-wishlist";
import login from "../utils/login";
import { requireConfigValue } from "../isomorphic-config";
export default useSignup;
export const handler = {
    // Provide fetchOptions for SWR cache key
    fetchOptions: {
        url: "account",
        query: "create"
    },
    async fetcher ({ input , options , fetch  }) {
        console.info("useSignup fetcher called. Configuration: ", "input: ", input, "options: ", options);
        const { email , password  } = input;
        if (!email || !password) {
            throw new ValidationError({
                message: "Email and password need to be provided."
            });
        }
        // TODO: Replace any with specific type from Spree SDK
        // once it's added to the SDK.
        const createAccountParameters = {
            user: {
                email,
                password,
                // The stock NJC interface doesn't have a
                // password confirmation field, so just copy password.
                passwordConfirmation: password
            }
        };
        // Create the user account.
        await fetch({
            variables: {
                methodPath: "account.create",
                arguments: [
                    createAccountParameters
                ]
            }
        });
        const getTokenParameters = {
            username: email,
            password
        };
        // Login immediately after the account is created.
        if (requireConfigValue("loginAfterSignup")) {
            await login(fetch, getTokenParameters, true);
        }
        return null;
    },
    useHook: ({ fetch  })=>{
        const useWrappedHook = ()=>{
            const customer = useCustomer();
            const cart = useCart();
            const wishlist = useWishlist();
            return useCallback(async (input)=>{
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
