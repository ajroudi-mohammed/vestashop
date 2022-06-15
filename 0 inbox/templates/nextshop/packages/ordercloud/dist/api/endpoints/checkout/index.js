import { createEndpoint } from "@vercel/commerce/api";
import checkoutEndpoint from "@vercel/commerce/api/endpoints/checkout";
import getCheckout from "./get-checkout";
import submitCheckout from "./submit-checkout";
export const handlers = {
    getCheckout,
    submitCheckout
};
const checkoutApi = createEndpoint({
    handler: checkoutEndpoint,
    handlers
});
export default checkoutApi;
