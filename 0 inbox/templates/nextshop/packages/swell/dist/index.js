import { getCommerceProvider, useCommerce as useCoreCommerce } from "@vercel/commerce";
import { swellProvider } from "./provider";
export { swellProvider };
export const CommerceProvider = getCommerceProvider(swellProvider);
export const useCommerce = ()=>useCoreCommerce();
