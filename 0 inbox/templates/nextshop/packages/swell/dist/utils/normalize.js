const money = ({ amount , currencyCode  })=>{
    return {
        value: +amount,
        currencyCode
    };
};
const normalizeProductOption = ({ id , name: displayName = "" , values =[]  })=>{
    let returnValues = values.map((value)=>{
        let output = {
            label: value.name
        };
        if (displayName.match(/colou?r/gi)) {
            output = {
                ...output,
                hexColors: [
                    value.name
                ]
            };
        }
        return output;
    });
    return {
        __typename: "MultipleChoiceOption",
        id,
        displayName,
        values: returnValues
    };
};
const normalizeProductImages = (images)=>{
    if (!images || images.length < 1) {
        return [
            {
                url: "/"
            }
        ];
    }
    return images == null ? void 0 : images.map(({ file , ...rest })=>{
        return {
            url: (file == null ? void 0 : file.url) + "",
            height: Number(file == null ? void 0 : file.height),
            width: Number(file == null ? void 0 : file.width),
            ...rest
        };
    });
};
const normalizeProductVariants = (variants, productOptions)=>{
    return variants == null ? void 0 : variants.map(({ id: id1 , name , price , option_value_ids: optionValueIds = []  })=>{
        const values = name.split(",").map((i)=>({
                name: i.trim(),
                label: i.trim()
            }));
        const options = optionValueIds.map((id)=>{
            const matchingOption = productOptions.find((option)=>{
                return option.values.find((value)=>value.id == id);
            });
            return normalizeProductOption({
                id,
                name: (matchingOption == null ? void 0 : matchingOption.name) ?? "",
                values
            });
        });
        return {
            id: id1,
            // name,
            // sku: sku ?? id,
            // price: price ?? null,
            // listPrice: price ?? null,
            // requiresShipping: true,
            options
        };
    });
};
export function normalizeProduct(swellProduct) {
    const { id , name , description , images , options , slug , variants , price: value , currency: currencyCode ,  } = swellProduct;
    // ProductView accesses variants for each product
    const emptyVariants = [
        {
            options: [],
            id,
            name
        }
    ];
    const productOptions = options ? options.map((o)=>normalizeProductOption(o)) : [];
    const productVariants = variants ? normalizeProductVariants(variants, options) : [];
    const productImages = normalizeProductImages(images);
    const product = {
        ...swellProduct,
        description,
        id,
        vendor: "",
        path: `/${slug}`,
        images: productImages,
        variants: productVariants && productVariants.length ? productVariants : emptyVariants,
        options: productOptions,
        price: {
            value,
            currencyCode
        }
    };
    return product;
}
export function normalizeCart({ id , account_id , date_created , currency , tax_included_total , items , sub_total , grand_total , discounts  }) {
    const cart = {
        id: id,
        customerId: account_id + "",
        email: "",
        createdAt: date_created,
        currency: {
            code: currency
        },
        taxesIncluded: tax_included_total > 0,
        lineItems: (items == null ? void 0 : items.map(normalizeLineItem)) ?? [],
        lineItemsSubtotalPrice: +sub_total,
        subtotalPrice: +sub_total,
        totalPrice: grand_total,
        discounts: discounts == null ? void 0 : discounts.map((discount)=>({
                value: discount.amount
            }))
    };
    return cart;
}
export function normalizeCustomer(customer) {
    const { first_name: firstName , last_name: lastName  } = customer;
    return {
        ...customer,
        firstName,
        lastName
    };
}
function normalizeLineItem({ id , product , price , variant , quantity  }) {
    const item = {
        id,
        variantId: variant == null ? void 0 : variant.id,
        productId: product.id ?? "",
        name: (product == null ? void 0 : product.name) ?? "",
        quantity,
        variant: {
            id: (variant == null ? void 0 : variant.id) ?? "",
            sku: (variant == null ? void 0 : variant.sku) ?? "",
            name: variant == null ? void 0 : variant.name,
            image: {
                url: (product == null ? void 0 : product.images) && product.images.length > 0 ? product == null ? void 0 : product.images[0].file.url : "/"
            },
            requiresShipping: false,
            price: price,
            listPrice: price
        },
        path: "",
        discounts: [],
        options: [
            {
                value: variant == null ? void 0 : variant.name
            }, 
        ]
    };
    return item;
}
