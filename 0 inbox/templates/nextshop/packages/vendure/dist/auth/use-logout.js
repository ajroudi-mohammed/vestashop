import { useCallback } from "react";
import useLogout from "@vercel/commerce/auth/use-logout";
import useCustomer from "../customer/use-customer";
import { logoutMutation } from "../utils/mutations/log-out-mutation";
export default useLogout;
export const handler = {
    fetchOptions: {
        query: logoutMutation
    },
    async fetcher ({ options , fetch  }) {
        await fetch({
            ...options
        });
        return null;
    },
    useHook: ({ fetch  })=>()=>{
            const { mutate  } = useCustomer();
            return useCallback(async function logout() {
                const data = await fetch();
                await mutate(null, false);
                return data;
            }, [
                fetch,
                mutate
            ]);
        }
};
