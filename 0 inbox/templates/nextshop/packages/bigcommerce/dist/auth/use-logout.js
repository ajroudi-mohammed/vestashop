import { useCallback } from "react";
import useLogout from "@vercel/commerce/auth/use-logout";
import useCustomer from "../customer/use-customer";
export default useLogout;
export const handler = {
    fetchOptions: {
        url: "/api/logout",
        method: "GET"
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
