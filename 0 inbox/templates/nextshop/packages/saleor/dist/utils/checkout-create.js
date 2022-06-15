import Cookies from "js-cookie";
import * as mutation from "./mutations";
import { CHECKOUT_ID_COOKIE } from "../const";
export const checkoutCreate = async (fetch)=>{
    var ref;
    const data = await fetch({
        query: mutation.CheckoutCreate
    });
    const checkout = (ref = data.checkoutCreate) == null ? void 0 : ref.checkout;
    const checkoutId = checkout == null ? void 0 : checkout.id;
    const checkoutToken = checkout == null ? void 0 : checkout.token;
    const value = `${checkoutId}:${checkoutToken}`;
    if (checkoutId) {
        const options = {
            expires: 60 * 60 * 24 * 30
        };
        Cookies.set(CHECKOUT_ID_COOKIE, value, options);
    }
    return checkout;
};
export default checkoutCreate;
