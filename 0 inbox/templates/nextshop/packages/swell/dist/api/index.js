import { getCommerceApi as commerceApi } from "@vercel/commerce/api";
import { SWELL_CHECKOUT_ID_COOKIE, SWELL_CUSTOMER_TOKEN_COOKIE, SWELL_COOKIE_EXPIRE } from "../const";
import fetchApi from "./utils/fetch-swell-api";
import login from "./operations/login";
import getAllPages from "./operations/get-all-pages";
import getPage from "./operations/get-page";
import getSiteInfo from "./operations/get-site-info";
import getAllProductPaths from "./operations/get-all-product-paths";
import getAllProducts from "./operations/get-all-products";
import getProduct from "./operations/get-product";
const config = {
    locale: "en-US",
    commerceUrl: "",
    apiToken: "",
    cartCookie: SWELL_CHECKOUT_ID_COOKIE,
    cartCookieMaxAge: SWELL_COOKIE_EXPIRE,
    fetch: fetchApi,
    customerCookie: SWELL_CUSTOMER_TOKEN_COOKIE
};
const operations = {
    login,
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
