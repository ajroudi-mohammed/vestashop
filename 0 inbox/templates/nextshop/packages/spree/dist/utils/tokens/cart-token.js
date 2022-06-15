import { requireConfigValue } from "../../isomorphic-config";
import Cookies from "js-cookie";
export const getCartToken = ()=>Cookies.get(requireConfigValue("cartCookieName"));
export const setCartToken = (cartToken)=>{
    const cookieOptions = {
        expires: requireConfigValue("cartCookieExpire")
    };
    Cookies.set(requireConfigValue("cartCookieName"), cartToken, cookieOptions);
};
export const removeCartToken = ()=>{
    Cookies.remove(requireConfigValue("cartCookieName"));
};
