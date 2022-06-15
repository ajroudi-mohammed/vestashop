import { createEndpoint } from "@vercel/commerce/api";
import signupEndpoint from "@vercel/commerce/api/endpoints/signup";
import signup from "./signup";
export const handlers = {
    signup
};
const singupApi = createEndpoint({
    handler: signupEndpoint,
    handlers
});
export default singupApi;
