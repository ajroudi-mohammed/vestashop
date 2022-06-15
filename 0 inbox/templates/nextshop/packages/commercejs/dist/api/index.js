import { getCommerceApi as commerceApi } from "@vercel/commerce/api";
import getAllPages from "./operations/get-all-pages";
import getPage from "./operations/get-page";
import getSiteInfo from "./operations/get-site-info";
import getAllProductPaths from "./operations/get-all-product-paths";
import getAllProducts from "./operations/get-all-products";
import getProduct from "./operations/get-product";
import sdkFetch from "./utils/sdk-fetch";
import createGraphqlFetcher from "./utils/graphql-fetch";
import { API_URL, CART_COOKIE, CUSTOMER_COOKIE } from "../constants";
const config = {
    commerceUrl: API_URL,
    cartCookie: CART_COOKIE,
    cartCookieMaxAge: 2592000,
    customerCookie: CUSTOMER_COOKIE,
    apiToken: "",
    fetch: createGraphqlFetcher(()=>getCommerceApi().getConfig()),
    sdkFetch
};
const operations = {
    getAllPages,
    getPage,
    getSiteInfo,
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
