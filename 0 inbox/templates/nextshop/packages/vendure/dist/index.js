import { getCommerceProvider, useCommerce as useCoreCommerce } from "@vercel/commerce";
import { vendureProvider } from "./provider";
export { vendureProvider };
export const CommerceProvider = getCommerceProvider(vendureProvider);
export const useCommerce = ()=>useCoreCommerce();
