import { createEndpoint } from "@vercel/commerce/api";
import customerAddressEndpoint from "@vercel/commerce/api/endpoints/customer/address";
import getAddresses from "./get-addresses";
import addItem from "./add-item";
import updateItem from "./update-item";
import removeItem from "./remove-item";
export const handlers = {
    getAddresses,
    addItem,
    updateItem,
    removeItem
};
const customerAddressApi = createEndpoint({
    handler: customerAddressEndpoint,
    handlers
});
export default customerAddressApi;
