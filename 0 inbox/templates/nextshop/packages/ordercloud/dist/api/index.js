import { getCommerceApi as commerceApi } from "@vercel/commerce/api";
import { createBuyerFetcher, createMiddlewareFetcher } from "./utils/fetch-rest";
import createGraphqlFetcher from "./utils/fetch-graphql";
import getAllPages from "./operations/get-all-pages";
import getPage from "./operations/get-page";
import getSiteInfo from "./operations/get-site-info";
import getAllProductPaths from "./operations/get-all-product-paths";
import getAllProducts from "./operations/get-all-products";
import getProduct from "./operations/get-product";
import { API_URL, API_VERSION, CART_COOKIE, CUSTOMER_COOKIE, TOKEN_COOKIE } from "../constants";
const config = {
    commerceUrl: API_URL,
    apiToken: "",
    apiVersion: API_VERSION,
    cartCookie: CART_COOKIE,
    customerCookie: CUSTOMER_COOKIE,
    tokenCookie: TOKEN_COOKIE,
    cartCookieMaxAge: 2592000,
    restBuyerFetch: createBuyerFetcher(()=>getCommerceApi().getConfig()),
    restMiddlewareFetch: createMiddlewareFetcher(()=>getCommerceApi().getConfig()),
    fetch: createGraphqlFetcher(()=>getCommerceApi().getConfig())
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
