import { ordercloudProvider } from "./provider";
import { getCommerceProvider, useCommerce as useCoreCommerce } from "@vercel/commerce";
export { ordercloudProvider };
export const CommerceProvider = getCommerceProvider(ordercloudProvider);
export const useCommerce = ()=>useCoreCommerce();
