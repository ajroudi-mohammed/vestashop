const normalizeLineItem = (commercejsLineItem)=>{
    var ref, ref1;
    const { id , sku , quantity , price , product_id , product_name , permalink , variant , image , selected_options ,  } = commercejsLineItem;
    return {
        id,
        variantId: (variant == null ? void 0 : variant.id) ?? "",
        productId: product_id,
        name: product_name,
        quantity,
        discounts: [],
        path: permalink,
        options: selected_options == null ? void 0 : selected_options.map(({ group_name , option_name  })=>({
                name: group_name,
                value: option_name
            })),
        variant: {
            id: (variant == null ? void 0 : variant.id) ?? id,
            sku: (variant == null ? void 0 : variant.sku) ?? sku,
            name: product_name,
            requiresShipping: false,
            price: (variant == null ? void 0 : (ref = variant.price) == null ? void 0 : ref.raw) ?? price.raw,
            listPrice: (variant == null ? void 0 : (ref1 = variant.price) == null ? void 0 : ref1.raw) ?? price.raw,
            image: {
                url: image == null ? void 0 : image.url
            }
        }
    };
};
export const normalizeCart = (commercejsCart)=>{
    const { id , created , subtotal: { raw: rawPrice  } , currency , line_items ,  } = commercejsCart;
    return {
        id,
        createdAt: new Date(created * 1000).toISOString(),
        currency: {
            code: currency.code
        },
        taxesIncluded: false,
        lineItems: line_items.map((item)=>{
            return normalizeLineItem(item);
        }),
        lineItemsSubtotalPrice: rawPrice,
        subtotalPrice: rawPrice,
        totalPrice: rawPrice
    };
};
