import { useCallback } from "react";
import Cookies from "js-cookie";
import useLogout from "@vercel/commerce/auth/use-logout";
import useCustomer from "../customer/use-customer";
import { CUSTOMER_COOKIE } from "../constants";
export default useLogout;
export const handler = {
    fetchOptions: {
        query: "_",
        method: "_"
    },
    useHook: ()=>()=>{
            const { mutate  } = useCustomer();
            return useCallback(async function logout() {
                Cookies.remove(CUSTOMER_COOKIE);
                await mutate(null, false);
                return null;
            }, [
                mutate
            ]);
        }
};
