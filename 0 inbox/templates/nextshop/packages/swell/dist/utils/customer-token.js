import Cookies from "js-cookie";
import { SWELL_COOKIE_EXPIRE, SWELL_CUSTOMER_TOKEN_COOKIE } from "../const";
export const getCustomerToken = ()=>Cookies.get(SWELL_CUSTOMER_TOKEN_COOKIE);
export const setCustomerToken = (token, options)=>{
    if (!token) {
        Cookies.remove(SWELL_CUSTOMER_TOKEN_COOKIE);
    } else {
        Cookies.set(SWELL_CUSTOMER_TOKEN_COOKIE, token, options ?? {
            expires: SWELL_COOKIE_EXPIRE
        });
    }
};
