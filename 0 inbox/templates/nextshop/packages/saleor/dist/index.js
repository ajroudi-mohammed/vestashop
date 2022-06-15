import { getCommerceProvider, useCommerce as useCoreCommerce } from "@vercel/commerce";
import { saleorProvider } from "./provider";
export { saleorProvider };
export const CommerceProvider = getCommerceProvider(saleorProvider);
export const useCommerce = ()=>useCoreCommerce();
