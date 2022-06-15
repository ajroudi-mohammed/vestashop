import { CommerceError } from "@vercel/commerce/utils/errors";
import { normalizeCart } from "./normalize";
import throwUserErrors from "./throw-user-errors";
const checkoutToCart = (checkoutPayload)=>{
    if (!checkoutPayload) {
        throw new CommerceError({
            message: "Missing checkout payload from response"
        });
    }
    const checkout = checkoutPayload == null ? void 0 : checkoutPayload.checkout;
    throwUserErrors(checkoutPayload == null ? void 0 : checkoutPayload.errors);
    if (!checkout) {
        throw new CommerceError({
            message: "Missing checkout object from response"
        });
    }
    return normalizeCart(checkout);
};
export default checkoutToCart;
