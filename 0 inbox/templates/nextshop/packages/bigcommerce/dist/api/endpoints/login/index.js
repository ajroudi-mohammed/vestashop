import { createEndpoint } from "@vercel/commerce/api";
import loginEndpoint from "@vercel/commerce/api/endpoints/login";
import login from "./login";
export const handlers = {
    login
};
const loginApi = createEndpoint({
    handler: loginEndpoint,
    handlers
});
export default loginApi;
