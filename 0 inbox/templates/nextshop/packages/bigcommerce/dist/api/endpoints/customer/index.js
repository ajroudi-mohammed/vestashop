import { createEndpoint } from "@vercel/commerce/api";
import customerEndpoint from "@vercel/commerce/api/endpoints/customer";
import getLoggedInCustomer from "./get-logged-in-customer";
export const handlers = {
    getLoggedInCustomer
};
const customerApi = createEndpoint({
    handler: customerEndpoint,
    handlers
});
export default customerApi;
