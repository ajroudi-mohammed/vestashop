import { getCommerceApi as commerceApi } from "@vercel/commerce/api";
import { API_URL, API_TOKEN, SHOPIFY_CUSTOMER_TOKEN_COOKIE, SHOPIFY_CHECKOUT_ID_COOKIE } from "../const";
import fetchGraphqlApi from "./utils/fetch-graphql-api";
import * as operations from "./operations";
if (!API_URL) {
    throw new Error(`The environment variable NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN is missing and it's required to access your store`);
}
if (!API_TOKEN) {
    throw new Error(`The environment variable NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN is missing and it's required to access your store`);
}
const ONE_DAY = 60 * 60 * 24;
const config = {
    commerceUrl: API_URL,
    apiToken: API_TOKEN,
    customerCookie: SHOPIFY_CUSTOMER_TOKEN_COOKIE,
    cartCookie: SHOPIFY_CHECKOUT_ID_COOKIE,
    cartCookieMaxAge: ONE_DAY * 30,
    fetch: fetchGraphqlApi
};
export const provider = {
    config,
    operations
};
export function getCommerceApi(customProvider = provider) {
    return commerceApi(customProvider);
}
