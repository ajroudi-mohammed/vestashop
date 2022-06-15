import { useCallback } from "react";
import useLogin from "@vercel/commerce/auth/use-login";
import { CommerceError, ValidationError } from "@vercel/commerce/utils/errors";
import useCustomer from "../customer/use-customer";
import { loginMutation } from "../utils/mutations/log-in-mutation";
export default useLogin;
export const handler = {
    fetchOptions: {
        query: loginMutation
    },
    async fetcher ({ input: { email , password  } , options , fetch  }) {
        if (!(email && password)) {
            throw new CommerceError({
                message: "A email and password are required to login"
            });
        }
        const variables = {
            username: email,
            password
        };
        const { login  } = await fetch({
            ...options,
            variables
        });
        if (login.__typename !== "CurrentUser") {
            throw new ValidationError(login);
        }
        return null;
    },
    useHook: ({ fetch  })=>()=>{
            const { mutate  } = useCustomer();
            return useCallback(async function login(input) {
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
