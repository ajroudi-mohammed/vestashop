import { getCommerceProvider, useCommerce as useCoreCommerce } from "@vercel/commerce";
import { sfccProvider } from "./provider";
export { sfccProvider };
export const CommerceProvider = getCommerceProvider(sfccProvider);
export const useCommerce = ()=>useCoreCommerce();
