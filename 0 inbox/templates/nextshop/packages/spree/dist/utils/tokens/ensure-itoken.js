import { getCartToken } from "./cart-token";
import { ensureUserTokenResponse } from "./user-token-response";
const ensureIToken = ()=>{
    const userTokenResponse = ensureUserTokenResponse();
    if (userTokenResponse) {
        return {
            bearerToken: userTokenResponse.access_token
        };
    }
    const cartToken = getCartToken();
    if (cartToken) {
        return {
            orderToken: cartToken
        };
    }
    return undefined;
};
export default ensureIToken;
