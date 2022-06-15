import { SWELL_CHECKOUT_URL_COOKIE } from "../../const";
import Cookies from "js-cookie";
export const checkoutCreate = async (fetch)=>{
    const cart = await fetch({
        query: "cart",
        method: "get"
    });
    if (!cart) {
        await fetch({
            query: "cart",
            method: "setItems",
            variables: [
                []
            ]
        });
    }
    const checkoutUrl = cart == null ? void 0 : cart.checkout_url;
    if (checkoutUrl) {
        Cookies.set(SWELL_CHECKOUT_URL_COOKIE, checkoutUrl);
    }
    return cart;
};
export default checkoutCreate;
