import { getCommerceApi as commerceApi } from "@vercel/commerce/api";
import createFetchGraphqlApi from "./utils/fetch-graphql-api";
import createFetchStoreApi from "./utils/fetch-store-api";
import login from "./operations/login";
import getAllPages from "./operations/get-all-pages";
import getPage from "./operations/get-page";
import getSiteInfo from "./operations/get-site-info";
import getCustomerWishlist from "./operations/get-customer-wishlist";
import getAllProductPaths from "./operations/get-all-product-paths";
import getAllProducts from "./operations/get-all-products";
import getProduct from "./operations/get-product";
const API_URL = process.env.BIGCOMMERCE_STOREFRONT_API_URL // GraphAPI
;
const API_TOKEN = process.env.BIGCOMMERCE_STOREFRONT_API_TOKEN;
const STORE_API_URL = process.env.BIGCOMMERCE_STORE_API_URL // REST API
;
const STORE_API_TOKEN = process.env.BIGCOMMERCE_STORE_API_TOKEN;
const STORE_API_CLIENT_ID = process.env.BIGCOMMERCE_STORE_API_CLIENT_ID;
const STORE_CHANNEL_ID = process.env.BIGCOMMERCE_CHANNEL_ID;
const STORE_URL = process.env.BIGCOMMERCE_STORE_URL;
const CLIENT_SECRET = process.env.BIGCOMMERCE_STORE_API_CLIENT_SECRET;
const STOREFRONT_HASH = process.env.BIGCOMMERCE_STORE_API_STORE_HASH;
if (!API_URL) {
    throw new Error(`The environment variable BIGCOMMERCE_STOREFRONT_API_URL is missing and it's required to access your store`);
}
if (!API_TOKEN) {
    throw new Error(`The environment variable BIGCOMMERCE_STOREFRONT_API_TOKEN is missing and it's required to access your store`);
}
if (!(STORE_API_URL && STORE_API_TOKEN && STORE_API_CLIENT_ID)) {
    throw new Error(`The environment variables BIGCOMMERCE_STORE_API_URL, BIGCOMMERCE_STORE_API_TOKEN, BIGCOMMERCE_STORE_API_CLIENT_ID have to be set in order to access the REST API of your store`);
}
const ONE_DAY = 60 * 60 * 24;
const config = {
    commerceUrl: API_URL,
    apiToken: API_TOKEN,
    customerCookie: "SHOP_TOKEN",
    cartCookie: process.env.BIGCOMMERCE_CART_COOKIE ?? "bc_cartId",
    cartCookieMaxAge: ONE_DAY * 30,
    fetch: createFetchGraphqlApi(()=>getCommerceApi().getConfig()),
    applyLocale: true,
    // REST API only
    storeApiUrl: STORE_API_URL,
    storeApiToken: STORE_API_TOKEN,
    storeApiClientId: STORE_API_CLIENT_ID,
    storeChannelId: STORE_CHANNEL_ID,
    storeUrl: STORE_URL,
    storeApiClientSecret: CLIENT_SECRET,
    storeHash: STOREFRONT_HASH,
    storeApiFetch: createFetchStoreApi(()=>getCommerceApi().getConfig())
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
