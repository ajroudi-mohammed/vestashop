import { getCommerceApi as commerceApi } from "@vercel/commerce/api";
import fetchGraphqlApi from "./utils/fetch-graphql-api";
import login from "./operations/login";
import getAllPages from "./operations/get-all-pages";
import getPage from "./operations/get-page";
import getSiteInfo from "./operations/get-site-info";
import getCustomerWishlist from "./operations/get-customer-wishlist";
import getAllProductPaths from "./operations/get-all-product-paths";
import getAllProducts from "./operations/get-all-products";
import getProduct from "./operations/get-product";
const API_URL = process.env.NEXT_PUBLIC_VENDURE_SHOP_API_URL;
if (!API_URL) {
    throw new Error(`The environment variable NEXT_PUBLIC_VENDURE_SHOP_API_URL is missing and it's required to access your store`);
}
const ONE_DAY = 60 * 60 * 24;
const config = {
    commerceUrl: API_URL,
    apiToken: "",
    cartCookie: "",
    customerCookie: "",
    cartCookieMaxAge: ONE_DAY * 30,
    fetch: fetchGraphqlApi
};
const operations = {
    login,
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
