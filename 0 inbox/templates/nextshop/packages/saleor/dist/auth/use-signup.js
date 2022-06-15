import { useCallback } from "react";
import { CommerceError } from "@vercel/commerce/utils/errors";
import useSignup from "@vercel/commerce/auth/use-signup";
import useCustomer from "../customer/use-customer";
import * as mutation from "../utils/mutations";
import { handleAutomaticLogin, throwUserErrors } from "../utils";
export default useSignup;
export const handler = {
    fetchOptions: {
        query: mutation.AccountCreate
    },
    async fetcher ({ input: { email , password  } , options , fetch  }) {
        if (!(email && password)) {
            throw new CommerceError({
                message: "A first name, last name, email and password are required to signup"
            });
        }
        const { customerCreate  } = await fetch({
            ...options,
            variables: {
                input: {
                    email,
                    password,
                    redirectUrl: "https://localhost.com",
                    channel: "default-channel"
                }
            }
        });
        throwUserErrors(customerCreate == null ? void 0 : customerCreate.errors);
        await handleAutomaticLogin(fetch, {
            email,
            password
        });
        return null;
    },
    useHook: ({ fetch  })=>()=>{
            const { mutate  } = useCustomer();
            return useCallback(async function signup(input) {
                const data = await fetch({
                    input
                });
                await mutate();
                return data;
            }, [
                fetch,
                mutate
            ]);
        }
};
