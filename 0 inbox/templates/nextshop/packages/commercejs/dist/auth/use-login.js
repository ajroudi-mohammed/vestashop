import { useCallback } from "react";
import useLogin from "@vercel/commerce/auth/use-login";
import { getDeploymentUrl } from "../utils/get-deployment-url";
export default useLogin;
const getLoginCallbackUrl = ()=>{
    const baseUrl = getDeploymentUrl();
    const API_ROUTE_PATH = "api/login";
    return `${baseUrl}/${API_ROUTE_PATH}`;
};
export const handler = {
    fetchOptions: {
        query: "customer",
        method: "login"
    },
    async fetcher ({ input , options: { query , method  } , fetch  }) {
        await fetch({
            query,
            method,
            variables: [
                input.email,
                getLoginCallbackUrl()
            ]
        });
        return null;
    },
    useHook: ({ fetch  })=>function useHook() {
            return useCallback(async function login(input) {
                return fetch({
                    input
                });
            }, []);
        }
};
