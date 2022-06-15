import { CommerceError } from "@vercel/commerce/utils/errors";
import { normalizeCart } from "../../utils";
const checkoutToCart = (checkoutPayload)=>{
    if (!checkoutPayload) {
        throw new CommerceError({
            message: "Invalid response from Swell"
        });
    }
    return normalizeCart(checkoutPayload);
};
export default checkoutToCart;
