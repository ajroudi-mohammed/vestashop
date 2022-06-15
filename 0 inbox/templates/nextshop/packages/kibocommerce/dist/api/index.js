import { getCommerceApi as commerceApi } from "@vercel/commerce/api";
import createFetchGraphqlApi from "./utils/fetch-graphql-api";
import getAllPages from "./operations/get-all-pages";
import getPage from "./operations/get-page";
import getSiteInfo from "./operations/get-site-info";
import getCustomerWishlist from "./operations/get-customer-wishlist";
import getAllProductPaths from "./operations/get-all-product-paths";
import getAllProducts from "./operations/get-all-products";
import getProduct from "./operations/get-product";
const config = {
    commerceUrl: process.env.KIBO_API_URL || "",
    apiToken: process.env.KIBO_API_TOKEN || "",
    cartCookie: process.env.KIBO_CART_COOKIE || "",
    customerCookie: process.env.KIBO_CUSTOMER_COOKIE || "",
    cartCookieMaxAge: 2592000,
    documentListName: "siteSnippets@mozu",
    fetch: createFetchGraphqlApi(()=>getCommerceApi().getConfig()),
    authUrl: process.env.KIBO_AUTH_URL || "",
    // REST API
    apiHost: process.env.KIBO_API_HOST || "",
    clientId: process.env.KIBO_CLIENT_ID || "",
    sharedSecret: process.env.KIBO_SHARED_SECRET || "",
    customerCookieMaxAgeInDays: 30,
    currencyCode: "USD",
    defaultWishlistName: "My Wishlist"
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
