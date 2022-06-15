import { commercejsProvider } from "./provider";
import { getCommerceProvider, useCommerce as useCoreCommerce } from "@vercel/commerce";
export { commercejsProvider };
export const CommerceProvider = getCommerceProvider(commercejsProvider);
export const useCommerce = ()=>useCoreCommerce();
