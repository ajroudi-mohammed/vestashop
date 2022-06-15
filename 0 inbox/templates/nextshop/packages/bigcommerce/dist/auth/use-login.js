import { useCallback } from "react";
import { CommerceError } from "@vercel/commerce/utils/errors";
import useLogin from "@vercel/commerce/auth/use-login";
import useCustomer from "../customer/use-customer";
export default useLogin;
export const handler = {
    fetchOptions: {
        url: "/api/login",
        method: "POST"
    },
    async fetcher ({ input: { email , password  } , options , fetch  }) {
        if (!(email && password)) {
            throw new CommerceError({
                message: "An email and password are required to login"
            });
        }
        return fetch({
            ...options,
            body: {
                email,
                password
            }
        });
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
