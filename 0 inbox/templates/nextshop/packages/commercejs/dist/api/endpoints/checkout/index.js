import { createEndpoint } from "@vercel/commerce/api";
import checkoutEndpoint from "@vercel/commerce/api/endpoints/checkout";
import submitCheckout from "./submit-checkout";
import getCheckout from "./get-checkout";
export const handlers = {
    submitCheckout,
    getCheckout
};
const checkoutApi = createEndpoint({
    handler: checkoutEndpoint,
    handlers
});
export default checkoutApi;
