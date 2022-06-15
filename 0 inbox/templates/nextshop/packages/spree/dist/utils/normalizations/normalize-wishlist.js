import MissingProductError from "../../errors/MissingProductError";
import MissingVariantError from "../../errors/MissingVariantError";
import { jsonApi } from "@spree/storefront-api-v2-sdk";
import normalizeProduct from "./normalize-product";
const normalizeWishlist = (spreeSuccessResponse, spreeWishlist)=>{
    const spreeWishedItems = jsonApi.findRelationshipDocuments(spreeSuccessResponse, spreeWishlist, "wished_items");
    const items = spreeWishedItems.map((spreeWishedItem)=>{
        const spreeWishedVariant = jsonApi.findSingleRelationshipDocument(spreeSuccessResponse, spreeWishedItem, "variant");
        if (spreeWishedVariant === null) {
            throw new MissingVariantError(`Couldn't find variant for wished item with id ${spreeWishedItem.id}.`);
        }
        const spreeWishedProduct = jsonApi.findSingleRelationshipDocument(spreeSuccessResponse, spreeWishedVariant, "product");
        if (spreeWishedProduct === null) {
            throw new MissingProductError(`Couldn't find product for variant with id ${spreeWishedVariant.id}.`);
        }
        return {
            id: spreeWishedItem.id,
            product_id: parseInt(spreeWishedProduct.id, 10),
            variant_id: parseInt(spreeWishedVariant.id, 10),
            product: normalizeProduct(spreeSuccessResponse, spreeWishedProduct)
        };
    });
    return {
        id: spreeWishlist.id,
        token: spreeWishlist.attributes.token,
        items
    };
};
export default normalizeWishlist;
