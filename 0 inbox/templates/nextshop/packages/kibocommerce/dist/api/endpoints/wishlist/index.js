import { createEndpoint } from "@vercel/commerce/api";
import wishlistEndpoint from "@vercel/commerce/api/endpoints/wishlist";
import getWishlist from "./get-wishlist";
import addItem from "./add-item";
import removeItem from "./remove-item";
export const handlers = {
    getWishlist,
    addItem,
    removeItem
};
const wishlistApi = createEndpoint({
    handler: wishlistEndpoint,
    handlers
});
export default wishlistApi;
