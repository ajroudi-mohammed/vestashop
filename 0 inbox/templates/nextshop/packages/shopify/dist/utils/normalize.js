import { colorMap } from "./colors";
const money = ({ amount , currencyCode  })=>{
    return {
        value: +amount,
        currencyCode
    };
};
const normalizeProductOption = ({ id , name: displayName , values  })=>{
    return {
        __typename: "MultipleChoiceOption",
        id,
        displayName: displayName.toLowerCase(),
        values: values.map((value)=>{
            let output = {
                label: value
            };
            if (displayName.match(/colou?r/gi)) {
                const mapedColor = colorMap[value.toLowerCase().replace(/ /g, "")];
                if (mapedColor) {
                    output = {
                        ...output,
                        hexColors: [
                            mapedColor
                        ]
                    };
                }
            }
            return output;
        })
    };
};
const normalizeProductImages = ({ edges  })=>{
    return edges == null ? void 0 : edges.map(({ node: { originalSrc: url , ...rest }  })=>({
            url,
            ...rest
        }));
};
const normalizeProductVariants = ({ edges  })=>{
    return edges == null ? void 0 : edges.map(({ node: { id , selectedOptions , sku , title , priceV2 , compareAtPriceV2 , requiresShipping , availableForSale ,  } ,  })=>{
        return {
            id,
            name: title,
            sku: sku ?? id,
            price: +priceV2.amount,
            listPrice: +(compareAtPriceV2 == null ? void 0 : compareAtPriceV2.amount),
            requiresShipping,
            availableForSale,
            options: selectedOptions.map(({ name , value  })=>{
                const options = normalizeProductOption({
                    id,
                    name,
                    values: [
                        value
                    ]
                });
                return options;
            })
        };
    });
};
export function normalizeProduct({ id , title: name , vendor , images , variants , description , descriptionHtml , handle , priceRange , options , metafields , ...rest }) {
    return {
        id,
        name,
        vendor,
        path: `/${handle}`,
        slug: handle == null ? void 0 : handle.replace(/^\/+|\/+$/g, ""),
        price: money(priceRange == null ? void 0 : priceRange.minVariantPrice),
        images: normalizeProductImages(images),
        variants: variants ? normalizeProductVariants(variants) : [],
        options: options ? options.filter((o)=>o.name !== "Title") // By default Shopify adds a 'Title' name when there's only one option. We don't need it. https://community.shopify.com/c/Shopify-APIs-SDKs/Adding-new-product-variant-is-automatically-adding-quot-Default/td-p/358095
        .map((o)=>normalizeProductOption(o)) : [],
        ...description && {
            description
        },
        ...descriptionHtml && {
            descriptionHtml
        },
        ...rest
    };
}
export function normalizeCart(checkout) {
    var ref, ref1, ref2, ref3, ref4;
    return {
        id: checkout.id,
        url: checkout.webUrl,
        customerId: "",
        email: "",
        createdAt: checkout.createdAt,
        currency: {
            code: (ref = checkout.totalPriceV2) == null ? void 0 : ref.currencyCode
        },
        taxesIncluded: checkout.taxesIncluded,
        lineItems: (ref1 = checkout.lineItems) == null ? void 0 : ref1.edges.map(normalizeLineItem),
        lineItemsSubtotalPrice: +((ref2 = checkout.subtotalPriceV2) == null ? void 0 : ref2.amount),
        subtotalPrice: +((ref3 = checkout.subtotalPriceV2) == null ? void 0 : ref3.amount),
        totalPrice: (ref4 = checkout.totalPriceV2) == null ? void 0 : ref4.amount,
        discounts: []
    };
}
function normalizeLineItem({ node: { id , title , variant , quantity  }  }) {
    var ref, ref5, ref6, ref7;
    return {
        id,
        variantId: String(variant == null ? void 0 : variant.id),
        productId: String(variant == null ? void 0 : variant.id),
        name: `${title}`,
        quantity,
        variant: {
            id: String(variant == null ? void 0 : variant.id),
            sku: (variant == null ? void 0 : variant.sku) ?? "",
            name: variant == null ? void 0 : variant.title,
            image: {
                url: (variant == null ? void 0 : (ref = variant.image) == null ? void 0 : ref.originalSrc) || "/product-img-placeholder.svg"
            },
            requiresShipping: (variant == null ? void 0 : variant.requiresShipping) ?? false,
            price: variant == null ? void 0 : (ref5 = variant.priceV2) == null ? void 0 : ref5.amount,
            listPrice: variant == null ? void 0 : (ref6 = variant.compareAtPriceV2) == null ? void 0 : ref6.amount
        },
        path: String(variant == null ? void 0 : (ref7 = variant.product) == null ? void 0 : ref7.handle),
        discounts: [],
        options: (variant == null ? void 0 : variant.title) == "Default Title" ? [] : variant == null ? void 0 : variant.selectedOptions
    };
}
export const normalizePage = ({ title: name , handle , ...page }, locale = "en-US")=>({
        ...page,
        url: `/${locale}/${handle}`,
        name
    });
export const normalizePages = (edges, locale)=>{
    return edges == null ? void 0 : edges.map((edge)=>normalizePage(edge.node, locale));
};
export const normalizeCategory = ({ title: name , handle , id  })=>({
        id,
        name,
        slug: handle,
        path: `/${handle}`
    });
