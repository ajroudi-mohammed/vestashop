import { normalizeCart } from "../../../lib/normalize";
import getCartCookie from "../../utils/get-cart-cookie";
const removeItem = async ({ res , body: { cartId , itemId  } , config ,  })=>{
    if (!cartId || !itemId) {
        return res.status(400).json({
            data: null,
            errors: [
                {
                    message: "Invalid request"
                }
            ]
        });
    }
    const result = await config.storeApiFetch(`/v3/carts/${cartId}/items/${itemId}?include=line_items.physical_items.options`, {
        method: "DELETE"
    });
    const data = (result == null ? void 0 : result.data) ?? null;
    res.setHeader("Set-Cookie", data ? getCartCookie(config.cartCookie, cartId, config.cartCookieMaxAge) : getCartCookie(config.cartCookie));
    res.status(200).json({
        data: data && normalizeCart(data)
    });
};
export default removeItem;
