import { getCommerceApi as commerceApi } from "@vercel/commerce/api";
import * as operations from "./operations";
import * as Const from "../const";
if (!Const.API_URL) {
    throw new Error(`The environment variable NEXT_SALEOR_API_URL is missing and it's required to access your store`);
}
if (!Const.API_CHANNEL) {
    throw new Error(`The environment variable NEXT_SALEOR_CHANNEL is missing and it's required to access your store`);
}
import fetchGraphqlApi from "./utils/fetch-graphql-api";
const config = {
    locale: "en-US",
    commerceUrl: Const.API_URL,
    apiToken: Const.SALEOR_TOKEN,
    cartCookie: Const.CHECKOUT_ID_COOKIE,
    cartCookieMaxAge: 60 * 60 * 24 * 30,
    fetch: fetchGraphqlApi,
    customerCookie: "",
    storeChannel: Const.API_CHANNEL
};
export const provider = {
    config,
    operations
};
export function getCommerceApi(customProvider = provider) {
    return commerceApi(customProvider);
}
