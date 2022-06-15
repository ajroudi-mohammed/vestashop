import { getCommerceProvider, useCommerce as useCoreCommerce } from "@vercel/commerce";
import { bigcommerceProvider } from "./provider";
export { bigcommerceProvider };
export const CommerceProvider = getCommerceProvider(bigcommerceProvider);
export const useCommerce = ()=>useCoreCommerce();
