import { createEndpoint } from "@vercel/commerce/api";
import logoutEndpoint from "@vercel/commerce/api/endpoints/logout";
import logout from "./logout";
export const handlers = {
    logout
};
const logoutApi = createEndpoint({
    handler: logoutEndpoint,
    handlers
});
export default logoutApi;
