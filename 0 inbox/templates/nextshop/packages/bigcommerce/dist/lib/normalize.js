import update from "./immutability";
import getSlug from "./get-slug";
function normalizeProductOption(productOption) {
    const { node: { entityId , values: { edges =[]  } = {} , ...rest } ,  } = productOption;
    return {
        id: entityId,
        values: edges == null ? void 0 : edges.map(({ node  })=>node),
        ...rest
    };
}
export function normalizeProduct(productNode) {
    const { entityId: id , productOptions: productOptions1 , prices , path , id: _ , options: _0 ,  } = productNode;
    return update(productNode, {
        id: {
            $set: String(id)
        },
        images: {
            $apply: ({ edges  })=>{
                return edges == null ? void 0 : edges.map(({ node: { urlOriginal , altText , ...rest }  })=>({
                        url: urlOriginal,
                        alt: altText,
                        ...rest
                    }));
            }
        },
        variants: {
            $apply: ({ edges  })=>{
                return edges == null ? void 0 : edges.map(({ node: { entityId , productOptions , ...rest }  })=>{
                    return {
                        id: entityId,
                        options: (productOptions == null ? void 0 : productOptions.edges) ? productOptions.edges.map(normalizeProductOption) : [],
                        ...rest
                    };
                });
            }
        },
        options: {
            $set: productOptions1.edges ? productOptions1 == null ? void 0 : productOptions1.edges.map(normalizeProductOption) : []
        },
        brand: {
            $apply: (brand)=>{
                return (brand == null ? void 0 : brand.entityId) ? brand == null ? void 0 : brand.entityId : null;
            }
        },
        slug: {
            $set: path == null ? void 0 : path.replace(/^\/+|\/+$/g, "")
        },
        price: {
            $set: {
                value: prices == null ? void 0 : prices.price.value,
                currencyCode: prices == null ? void 0 : prices.price.currencyCode
            }
        },
        $unset: [
            "entityId"
        ]
    });
}
export function normalizePage(page) {
    return {
        id: String(page.id),
        name: page.name,
        is_visible: page.is_visible,
        sort_order: page.sort_order,
        body: page.body
    };
}
export function normalizeCart(data) {
    var ref;
    return {
        id: data.id,
        customerId: String(data.customer_id),
        email: data.email,
        createdAt: data.created_time,
        currency: data.currency,
        taxesIncluded: data.tax_included,
        lineItems: [
            ...data.line_items.physical_items.map(normalizeLineItem),
            ...data.line_items.digital_items.map(normalizeLineItem), 
        ],
        lineItemsSubtotalPrice: data.base_amount,
        subtotalPrice: data.base_amount + data.discount_amount,
        totalPrice: data.cart_amount,
        discounts: (ref = data.discounts) == null ? void 0 : ref.map((discount)=>({
                value: discount.discounted_amount
            }))
    };
}
function normalizeLineItem(item) {
    return {
        id: item.id,
        variantId: String(item.variant_id),
        productId: String(item.product_id),
        name: item.name,
        quantity: item.quantity,
        variant: {
            id: String(item.variant_id),
            sku: item.sku,
            name: item.name,
            image: {
                url: item.image_url
            },
            requiresShipping: item.is_require_shipping,
            price: item.sale_price,
            listPrice: item.list_price
        },
        options: item.options,
        path: item.url.split("/")[3],
        discounts: item.discounts.map((discount)=>({
                value: discount.discounted_amount
            }))
    };
}
export function normalizeCategory(category) {
    return {
        id: `${category.entityId}`,
        name: category.name,
        slug: getSlug(category.path),
        path: category.path
    };
}
