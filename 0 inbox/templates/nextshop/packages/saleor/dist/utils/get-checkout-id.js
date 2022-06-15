import Cookies from "js-cookie";
import { CHECKOUT_ID_COOKIE } from "../const";
const getCheckoutId = (id)=>{
    var ref;
    const r = ((ref = Cookies.get(CHECKOUT_ID_COOKIE)) == null ? void 0 : ref.split(":")) || [];
    return {
        checkoutId: r[0],
        checkoutToken: r[1]
    };
};
export default getCheckoutId;
