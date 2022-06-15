import CookieHandler from "../../../api/utils/cookie-handler";
import { normalizeCart } from "../../../lib/normalize";
import { getCartQuery } from "../../queries/get-cart-query";
const getCart = async ({ req , res , body: { cartId  } , config ,  })=>{
    let currentCart = {};
    try {
        var ref;
        const cookieHandler = new CookieHandler(config, req, res);
        let accessToken = null;
        if (!cookieHandler.getAccessToken()) {
            let anonymousShopperTokenResponse = await cookieHandler.getAnonymousToken();
            const response = anonymousShopperTokenResponse.response;
            accessToken = anonymousShopperTokenResponse.accessToken;
            cookieHandler.setAnonymousShopperCookie(response);
        } else {
            accessToken = cookieHandler.getAccessToken();
        }
        let result = await config.fetch(getCartQuery, {}, {
            headers: {
                "x-vol-user-claims": accessToken
            }
        });
        currentCart = result == null ? void 0 : (ref = result.data) == null ? void 0 : ref.currentCart;
    } catch (error) {
        throw error;
    }
    res.status(200).json({
        data: currentCart ? normalizeCart(currentCart) : null
    });
};
export default getCart;
