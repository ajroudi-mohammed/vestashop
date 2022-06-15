import { useCallback } from "react";
import { CommerceError, ValidationError } from "@vercel/commerce/utils/errors";
import useCustomer from "../customer/use-customer";
import useLogin from "@vercel/commerce/auth/use-login";
import { setCustomerToken } from "../utils";
export default useLogin;
const getErrorMessage = ({ code , message  })=>{
    switch(code){
        case "UNIDENTIFIED_CUSTOMER":
            message = "Cannot find an account that matches the provided credentials";
            break;
    }
    return message;
};
export const handler = {
    fetchOptions: {
        query: "account",
        method: "login"
    },
    async fetcher ({ input: { email , password  } , options , fetch  }) {
        if (!(email && password)) {
            throw new CommerceError({
                message: "A first name, last name, email and password are required to login"
            });
        }
        const { customerAccessTokenCreate  } = await fetch({
            ...options,
            variables: [
                email,
                password
            ]
        });
        const errors = customerAccessTokenCreate == null ? void 0 : customerAccessTokenCreate.customerUserErrors;
        if (errors && errors.length) {
            throw new ValidationError({
                message: getErrorMessage(errors[0])
            });
        }
        const customerAccessToken = customerAccessTokenCreate == null ? void 0 : customerAccessTokenCreate.customerAccessToken;
        const accessToken = customerAccessToken == null ? void 0 : customerAccessToken.accessToken;
        if (accessToken) {
            setCustomerToken(accessToken);
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
