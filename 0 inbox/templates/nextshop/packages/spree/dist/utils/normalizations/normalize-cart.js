import MissingLineItemVariantError from "../../errors/MissingLineItemVariantError";
import { requireConfigValue } from "../../isomorphic-config";
import { jsonApi } from "@spree/storefront-api-v2-sdk";
import createGetAbsoluteImageUrl from "../create-get-absolute-image-url";
import getMediaGallery from "../get-media-gallery";
const placeholderImage = requireConfigValue("lineItemPlaceholderImageUrl");
const isColorProductOption = (productOptionType)=>{
    return productOptionType.attributes.presentation === "Color";
};
const normalizeVariant = (spreeSuccessResponse, spreeVariant)=>{
    const spreeProduct = jsonApi.findSingleRelationshipDocument(spreeSuccessResponse, spreeVariant, "product");
    if (spreeProduct === null) {
        throw new MissingLineItemVariantError(`Couldn't find product for variant with id ${spreeVariant.id}.`);
    }
    const spreeVariantImageRecords = jsonApi.findRelationshipDocuments(spreeSuccessResponse, spreeVariant, "images");
    let lineItemImage;
    const variantImage = getMediaGallery(spreeVariantImageRecords, createGetAbsoluteImageUrl(requireConfigValue("imageHost")))[0];
    if (variantImage) {
        lineItemImage = variantImage;
    } else {
        const spreeProductImageRecords = jsonApi.findRelationshipDocuments(spreeSuccessResponse, spreeProduct, "images");
        const productImage = getMediaGallery(spreeProductImageRecords, createGetAbsoluteImageUrl(requireConfigValue("imageHost")))[0];
        lineItemImage = productImage;
    }
    const image = lineItemImage ?? (placeholderImage === false ? undefined : {
        url: placeholderImage
    });
    return {
        id: spreeVariant.id,
        sku: spreeVariant.attributes.sku,
        name: spreeProduct.attributes.name,
        requiresShipping: true,
        price: parseFloat(spreeVariant.attributes.price),
        listPrice: parseFloat(spreeVariant.attributes.price),
        image,
        isInStock: spreeVariant.attributes.in_stock,
        availableForSale: spreeVariant.attributes.purchasable,
        ...spreeVariant.attributes.weight === "0.0" ? {} : {
            weight: {
                value: parseFloat(spreeVariant.attributes.weight),
                unit: "KILOGRAMS"
            }
        }
    };
};
const normalizeLineItem = (spreeSuccessResponse, spreeLineItem)=>{
    const variant = jsonApi.findSingleRelationshipDocument(spreeSuccessResponse, spreeLineItem, "variant");
    if (variant === null) {
        throw new MissingLineItemVariantError(`Couldn't find variant for line item with id ${spreeLineItem.id}.`);
    }
    const product = jsonApi.findSingleRelationshipDocument(spreeSuccessResponse, variant, "product");
    if (product === null) {
        throw new MissingLineItemVariantError(`Couldn't find product for variant with id ${variant.id}.`);
    }
    // CartItem.tsx expects path without a '/' prefix unlike pages/product/[slug].tsx and others.
    const path = `${product.attributes.slug}`;
    const spreeOptionValues = jsonApi.findRelationshipDocuments(spreeSuccessResponse, variant, "option_values");
    const options = spreeOptionValues.map((spreeOptionValue)=>{
        const spreeOptionType = jsonApi.findSingleRelationshipDocument(spreeSuccessResponse, spreeOptionValue, "option_type");
        if (spreeOptionType === null) {
            throw new MissingLineItemVariantError(`Couldn't find option type of option value with id ${spreeOptionValue.id}.`);
        }
        const label = isColorProductOption(spreeOptionType) ? spreeOptionValue.attributes.name : spreeOptionValue.attributes.presentation;
        return {
            id: spreeOptionValue.id,
            name: spreeOptionType.attributes.presentation,
            value: label
        };
    });
    return {
        id: spreeLineItem.id,
        variantId: variant.id,
        productId: product.id,
        name: spreeLineItem.attributes.name,
        quantity: spreeLineItem.attributes.quantity,
        discounts: [],
        path,
        variant: normalizeVariant(spreeSuccessResponse, variant),
        options
    };
};
const normalizeCart = (spreeSuccessResponse, spreeCart)=>{
    const lineItems = jsonApi.findRelationshipDocuments(spreeSuccessResponse, spreeCart, "line_items").map((lineItem)=>normalizeLineItem(spreeSuccessResponse, lineItem));
    return {
        id: spreeCart.id,
        createdAt: spreeCart.attributes.created_at.toString(),
        currency: {
            code: spreeCart.attributes.currency
        },
        taxesIncluded: true,
        lineItems,
        lineItemsSubtotalPrice: parseFloat(spreeCart.attributes.item_total),
        subtotalPrice: parseFloat(spreeCart.attributes.item_total),
        totalPrice: parseFloat(spreeCart.attributes.total),
        customerId: spreeCart.attributes.token,
        email: spreeCart.attributes.email,
        discounts: []
    };
};
export { normalizeLineItem };
export default normalizeCart;
