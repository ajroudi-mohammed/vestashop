import Cookies from "js-cookie";
import { SWELL_CHECKOUT_ID_COOKIE } from "../const";
const getCheckoutId = (id)=>{
    return id ?? Cookies.get(SWELL_CHECKOUT_ID_COOKIE);
};
export default getCheckoutId;
