import { normalizeCart } from "../../../lib/normalize";
import removeItemFromCartMutation from "../../../api/mutations/removeItemFromCart-mutation";
import { getCartQuery } from "../../../api/queries/get-cart-query";
const removeItem = async ({ req , res , body: { cartId , itemId  } , config ,  })=>{
    if (!itemId) {
        return res.status(400).json({
            data: null,
            errors: [
                {
                    message: "Invalid request"
                }
            ]
        });
    }
    const encodedToken = req.cookies[config.customerCookie];
    const token = encodedToken ? Buffer.from(encodedToken, "base64").toString("ascii") : null;
    const accessToken = token ? JSON.parse(token).accessToken : null;
    const removeItemResponse = await config.fetch(removeItemFromCartMutation, {
        variables: {
            id: itemId
        }
    }, {
        headers: {
            "x-vol-user-claims": accessToken
        }
    });
    let currentCart = null;
    if (removeItemResponse.data.deleteCurrentCartItem) {
        var ref;
        let result = await config.fetch(getCartQuery, {}, {
            headers: {
                "x-vol-user-claims": accessToken
            }
        });
        currentCart = result == null ? void 0 : (ref = result.data) == null ? void 0 : ref.currentCart;
    }
    res.status(200).json({
        data: normalizeCart(currentCart)
    });
};
export default removeItem;
