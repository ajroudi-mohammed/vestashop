function getOptionsFromVariantGroups(variantGroups) {
    const optionsFromVariantGroups = variantGroups.map(({ id , name: variantName , options  })=>({
            id,
            displayName: variantName,
            values: options.map(({ name: optionName  })=>({
                    label: optionName
                }))
        }));
    return optionsFromVariantGroups;
}
function normalizeVariants(variants = [], variantGroups) {
    if (!Array.isArray(variants)) return [];
    return variants == null ? void 0 : variants.map((variant)=>{
        return {
            id: variant.id,
            options: Object.entries(variant.options).map(([variantGroupId, variantOptionId])=>{
                var ref;
                const variantGroupFromId = variantGroups.find((group)=>group.id === variantGroupId);
                const valueLabel = (ref = variantGroupFromId == null ? void 0 : variantGroupFromId.options.find((option)=>option.id === variantOptionId)) == null ? void 0 : ref.name;
                return {
                    id: variantOptionId,
                    displayName: (variantGroupFromId == null ? void 0 : variantGroupFromId.name) || "",
                    __typename: "MultipleChoiceOption",
                    values: [
                        {
                            label: valueLabel || ""
                        }, 
                    ]
                };
            })
        };
    });
}
export function normalizeProduct(commercejsProduct, commercejsProductVariants = []) {
    const { id , name , description: description1 , permalink , assets , price , variant_groups  } = commercejsProduct;
    return {
        id,
        name,
        description: description1,
        descriptionHtml: description1,
        slug: permalink,
        path: permalink,
        images: assets.map(({ url , description , filename  })=>({
                url,
                alt: description || filename
            })),
        price: {
            value: price.raw,
            currencyCode: "USD"
        },
        variants: normalizeVariants(commercejsProductVariants, variant_groups),
        options: getOptionsFromVariantGroups(variant_groups)
    };
}
