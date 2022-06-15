import Cookies from "js-cookie";
import { SHOPIFY_CHECKOUT_ID_COOKIE, SHOPIFY_CHECKOUT_URL_COOKIE, SHOPIFY_COOKIE_EXPIRE } from "../const";
import checkoutCreateMutation from "./mutations/checkout-create";
export const checkoutCreate = async (fetch, lineItems)=>{
    const { checkoutCreate: checkoutCreate1  } = await fetch({
        query: checkoutCreateMutation,
        variables: {
            input: {
                lineItems
            }
        }
    });
    const checkout = checkoutCreate1 == null ? void 0 : checkoutCreate1.checkout;
    if (checkout) {
        const checkoutId = checkout == null ? void 0 : checkout.id;
        const options = {
            expires: SHOPIFY_COOKIE_EXPIRE
        };
        Cookies.set(SHOPIFY_CHECKOUT_ID_COOKIE, checkoutId, options);
        if (checkout == null ? void 0 : checkout.webUrl) {
            Cookies.set(SHOPIFY_CHECKOUT_URL_COOKIE, checkout.webUrl, options);
        }
    }
    return checkoutCreate1;
};
export default checkoutCreate;
