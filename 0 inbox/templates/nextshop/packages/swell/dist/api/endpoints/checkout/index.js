import { createEndpoint } from "@vercel/commerce/api";
import { SWELL_CHECKOUT_URL_COOKIE } from "../../../const";
import checkoutEndpoint from "@vercel/commerce/api/endpoints/checkout";
const getCheckout = async ({ req , res , config ,  })=>{
    const { cookies  } = req;
    const checkoutUrl = cookies[SWELL_CHECKOUT_URL_COOKIE];
    if (checkoutUrl) {
        res.redirect(checkoutUrl);
    } else {
        res.redirect("/cart");
    }
};
export const handlers = {
    getCheckout
};
const checkoutApi = createEndpoint({
    handler: checkoutEndpoint,
    handlers
});
export default checkoutApi;
