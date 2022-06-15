import { getCommerceProvider, useCommerce as useCoreCommerce } from "@vercel/commerce";
import { kiboCommerceProvider } from "./provider";
export { kiboCommerceProvider };
export const CommerceProvider = getCommerceProvider(kiboCommerceProvider);
export const useCommerce = ()=>useCoreCommerce();
