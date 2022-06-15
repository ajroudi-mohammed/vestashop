import { createEndpoint } from "@vercel/commerce/api";
import productsEndpoint from "@vercel/commerce/api/endpoints/catalog/products";
import getProducts from "./get-products";
export const handlers = {
    getProducts
};
const productsApi = createEndpoint({
    handler: productsEndpoint,
    handlers
});
export default productsApi;
