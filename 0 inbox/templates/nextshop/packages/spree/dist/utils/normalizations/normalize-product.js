import { jsonApi } from "@spree/storefront-api-v2-sdk";
import { requireConfigValue } from "../../isomorphic-config";
import createGetAbsoluteImageUrl from "../create-get-absolute-image-url";
import expandOptions from "../expand-options";
import getMediaGallery from "../get-media-gallery";
import getProductPath from "../get-product-path";
import MissingPrimaryVariantError from "../../errors/MissingPrimaryVariantError";
import MissingOptionValueError from "../../errors/MissingOptionValueError";
const placeholderImage = requireConfigValue("productPlaceholderImageUrl");
const imagesOptionFilter = requireConfigValue("imagesOptionFilter");
const normalizeProduct = (spreeSuccessResponse, spreeProduct)=>{
    const spreePrimaryVariant = jsonApi.findSingleRelationshipDocument(spreeSuccessResponse, spreeProduct, "primary_variant");
    if (spreePrimaryVariant === null) {
        throw new MissingPrimaryVariantError(`Couldn't find primary variant for product with id ${spreeProduct.id}.`);
    }
    const sku = spreePrimaryVariant.attributes.sku;
    const price = {
        value: parseFloat(spreeProduct.attributes.price),
        currencyCode: spreeProduct.attributes.currency
    };
    const hasNonMasterVariants = spreeProduct.relationships.variants.data.length > 1;
    const showOptions = requireConfigValue("showSingleVariantOptions") || hasNonMasterVariants;
    let options = [];
    const spreeVariantRecords = jsonApi.findRelationshipDocuments(spreeSuccessResponse, spreeProduct, "variants");
    // Use variants with option values if available. Fall back to
    // Spree primary_variant if no explicit variants are present.
    const spreeOptionsVariantsOrPrimary = spreeVariantRecords.length === 0 ? [
        spreePrimaryVariant
    ] : spreeVariantRecords;
    const variants = spreeOptionsVariantsOrPrimary.map((spreeVariantRecord)=>{
        let variantOptions = [];
        if (showOptions) {
            const spreeOptionValues = jsonApi.findRelationshipDocuments(spreeSuccessResponse, spreeVariantRecord, "option_values");
            // Only include options which are used by variants.
            spreeOptionValues.forEach((spreeOptionValue)=>{
                variantOptions = expandOptions(spreeSuccessResponse, spreeOptionValue, variantOptions);
                options = expandOptions(spreeSuccessResponse, spreeOptionValue, options);
            });
        }
        return {
            id: spreeVariantRecord.id,
            options: variantOptions
        };
    });
    const spreePrimaryVariantImageRecords = jsonApi.findRelationshipDocuments(spreeSuccessResponse, spreePrimaryVariant, "images");
    let spreeVariantImageRecords;
    if (imagesOptionFilter === false) {
        spreeVariantImageRecords = spreeVariantRecords.reduce((accumulatedImageRecords, spreeVariantRecord)=>{
            return [
                ...accumulatedImageRecords,
                ...jsonApi.findRelationshipDocuments(spreeSuccessResponse, spreeVariantRecord, "images"), 
            ];
        }, []);
    } else {
        const spreeOptionTypes = jsonApi.findRelationshipDocuments(spreeSuccessResponse, spreeProduct, "option_types");
        const imagesFilterOptionType = spreeOptionTypes.find((spreeOptionType)=>spreeOptionType.attributes.name === imagesOptionFilter);
        if (!imagesFilterOptionType) {
            console.warn(`Couldn't find option type having name ${imagesOptionFilter} for product with id ${spreeProduct.id}.` + " Showing no images for this product.");
            spreeVariantImageRecords = [];
        } else {
            const imagesOptionTypeFilterId = imagesFilterOptionType.id;
            const includedOptionValuesImagesIds = [];
            spreeVariantImageRecords = spreeVariantRecords.reduce((accumulatedImageRecords, spreeVariantRecord)=>{
                const spreeVariantOptionValuesIdentifiers = spreeVariantRecord.relationships.option_values.data;
                const spreeOptionValueOfFilterTypeIdentifier = spreeVariantOptionValuesIdentifiers.find((spreeVariantOptionValuesIdentifier)=>imagesFilterOptionType.relationships.option_values.data.some((filterOptionTypeValueIdentifier)=>filterOptionTypeValueIdentifier.id === spreeVariantOptionValuesIdentifier.id));
                if (!spreeOptionValueOfFilterTypeIdentifier) {
                    throw new MissingOptionValueError(`Couldn't find option value related to option type with id ${imagesOptionTypeFilterId}.`);
                }
                const optionValueImagesAlreadyIncluded = includedOptionValuesImagesIds.includes(spreeOptionValueOfFilterTypeIdentifier.id);
                if (optionValueImagesAlreadyIncluded) {
                    return accumulatedImageRecords;
                }
                includedOptionValuesImagesIds.push(spreeOptionValueOfFilterTypeIdentifier.id);
                return [
                    ...accumulatedImageRecords,
                    ...jsonApi.findRelationshipDocuments(spreeSuccessResponse, spreeVariantRecord, "images"), 
                ];
            }, []);
        }
    }
    const spreeImageRecords = [
        ...spreePrimaryVariantImageRecords,
        ...spreeVariantImageRecords, 
    ];
    const productImages = getMediaGallery(spreeImageRecords, createGetAbsoluteImageUrl(requireConfigValue("imageHost")));
    const images = productImages.length === 0 ? placeholderImage === false ? [] : [
        {
            url: placeholderImage
        }
    ] : productImages;
    const slug = spreeProduct.attributes.slug;
    const path = getProductPath(spreeProduct);
    return {
        id: spreeProduct.id,
        name: spreeProduct.attributes.name,
        description: spreeProduct.attributes.description,
        images,
        variants,
        options,
        price,
        slug,
        path,
        sku
    };
};
export default normalizeProduct;
