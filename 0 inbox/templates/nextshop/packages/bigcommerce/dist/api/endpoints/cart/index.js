import { createEndpoint } from "@vercel/commerce/api";
import cartEndpoint from "@vercel/commerce/api/endpoints/cart";
import getCart from "./get-cart";
import addItem from "./add-item";
import updateItem from "./update-item";
import removeItem from "./remove-item";
export const handlers = {
    getCart,
    addItem,
    updateItem,
    removeItem
};
const cartApi = createEndpoint({
    handler: cartEndpoint,
    handlers
});
export default cartApi;
