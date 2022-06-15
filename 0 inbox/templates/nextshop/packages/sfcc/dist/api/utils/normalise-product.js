const normaliseOptions = (options)=>{
    if (!Array.isArray(options)) return [];
    return options.map((option)=>{
        return {
            id: option.id,
            displayName: option.name,
            values: option.values.map((value)=>({
                    label: value.name
                }))
        };
    });
};
const normaliseVariants = (variants)=>{
    if (!Array.isArray(variants)) return [];
    return variants.map((variant)=>{
        const options = [];
        if (variant.variationValues) {
            for (const [key, value] of Object.entries(variant.variationValues)){
                const variantOptionObject = {
                    id: `${variant.productId}-${key}`,
                    displayName: key,
                    values: [
                        {
                            label: value
                        }, 
                    ]
                };
                options.push(variantOptionObject);
            }
        }
        return {
            id: variant.productId,
            options
        };
    });
};
export function normalizeProduct(product) {
    return {
        id: product.id,
        // TODO: use `name-ID` as a virtual slug (for search 1:1)
        slug: product.id,
        name: product.name,
        description: product.longDescription,
        price: {
            value: product.price,
            currencyCode: product.currency
        },
        images: product.imageGroups[0].images.map((image)=>({
                url: image.disBaseLink,
                altText: image.title
            })),
        variants: normaliseVariants(product.variants),
        options: normaliseOptions(product.variationAttributes)
    };
}
export function normalizeSearchProducts(products) {
    return products.map((product)=>({
            id: product.productId,
            slug: product.productId,
            name: product.productName,
            description: "",
            price: {
                value: product.price,
                currencyCode: product.currency
            },
            images: [
                {
                    url: product.image.link,
                    altText: product.productName
                }, 
            ],
            variants: normaliseVariants(product.variants),
            options: normaliseOptions(product.variationAttributes)
        }));
}
