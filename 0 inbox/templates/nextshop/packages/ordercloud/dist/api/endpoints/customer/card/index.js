import { createEndpoint } from "@vercel/commerce/api";
import customerCardEndpoint from "@vercel/commerce/api/endpoints/customer/card";
import getCards from "./get-cards";
import addItem from "./add-item";
import updateItem from "./update-item";
import removeItem from "./remove-item";
export const handlers = {
    getCards,
    addItem,
    updateItem,
    removeItem
};
const customerCardApi = createEndpoint({
    handler: customerCardEndpoint,
    handlers
});
export default customerCardApi;
