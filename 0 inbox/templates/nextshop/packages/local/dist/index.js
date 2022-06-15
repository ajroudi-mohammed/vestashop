import { getCommerceProvider, useCommerce as useCoreCommerce } from "@vercel/commerce";
import { localProvider } from "./provider";
export { localProvider };
export const CommerceProvider = getCommerceProvider(localProvider);
export const useCommerce = ()=>useCoreCommerce();
