import { useCallback } from "react";
import { CommerceError, ValidationError } from "@vercel/commerce/utils/errors";
import useSignup from "@vercel/commerce/auth/use-signup";
import useCustomer from "../customer/use-customer";
import { signupMutation } from "../utils/mutations/sign-up-mutation";
export default useSignup;
export const handler = {
    fetchOptions: {
        query: signupMutation
    },
    async fetcher ({ input: { firstName , lastName , email , password  } , options , fetch ,  }) {
        if (!(firstName && lastName && email && password)) {
            throw new CommerceError({
                message: "A first name, last name, email and password are required to signup"
            });
        }
        const variables = {
            input: {
                firstName,
                lastName,
                emailAddress: email,
                password
            }
        };
        const { registerCustomerAccount  } = await fetch({
            ...options,
            variables
        });
        if (registerCustomerAccount.__typename !== "Success") {
            throw new ValidationError(registerCustomerAccount);
        }
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
