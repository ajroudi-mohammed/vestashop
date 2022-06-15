import { createEndpoint } from "@vercel/commerce/api";
import getProducts from "./get-products";
import productsEndpoint from "@vercel/commerce/api/endpoints/catalog/products";
export const handlers = {
    getProducts
};
const productsApi = createEndpoint({
    handler: productsEndpoint,
    handlers
});
export default productsApi;
