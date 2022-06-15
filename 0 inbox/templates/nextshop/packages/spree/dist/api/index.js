import { getCommerceApi as commerceApi } from "@vercel/commerce/api";
import createApiFetch from "./utils/create-api-fetch";
import getAllPages from "./operations/get-all-pages";
import getPage from "./operations/get-page";
import getSiteInfo from "./operations/get-site-info";
import getCustomerWishlist from "./operations/get-customer-wishlist";
import getAllProductPaths from "./operations/get-all-product-paths";
import getAllProducts from "./operations/get-all-products";
import getProduct from "./operations/get-product";
const config = {
    commerceUrl: "",
    apiToken: "",
    cartCookie: "",
    customerCookie: "",
    cartCookieMaxAge: 2592000,
    fetch: createApiFetch(()=>getCommerceApi().getConfig())
};
const operations = {
    getAllPages,
    getPage,
    getSiteInfo,
    getCustomerWishlist,
    getAllProductPaths,
    getAllProducts,
    getProduct
};
export const provider = {
    config,
    operations
};
export function getCommerceApi(customProvider = provider) {
    return commerceApi(customProvider);
}
