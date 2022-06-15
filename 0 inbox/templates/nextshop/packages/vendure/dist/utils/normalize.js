export function normalizeSearchResult(item) {
    var ref, ref1;
    return {
        id: item.productId,
        name: item.productName,
        description: item.description,
        slug: item.slug,
        path: item.slug,
        images: [
            {
                url: ((ref = item.productAsset) == null ? void 0 : ref.preview) ? ((ref1 = item.productAsset) == null ? void 0 : ref1.preview) + "?w=800&mode=crop" : ""
            }, 
        ],
        variants: [],
        price: {
            value: item.priceWithTax.min / 100,
            currencyCode: item.currencyCode
        },
        options: [],
        sku: item.sku
    };
}
export function normalizeCart(order) {
    var ref4, ref2;
    return {
        id: order.id.toString(),
        createdAt: order.createdAt,
        taxesIncluded: true,
        lineItemsSubtotalPrice: order.subTotalWithTax / 100,
        currency: {
            code: order.currencyCode
        },
        subtotalPrice: order.subTotalWithTax / 100,
        totalPrice: order.totalWithTax / 100,
        customerId: (ref4 = order.customer) == null ? void 0 : ref4.id,
        lineItems: (ref2 = order.lines) == null ? void 0 : ref2.map((l)=>{
            var ref, ref3;
            return {
                id: l.id,
                name: l.productVariant.name,
                quantity: l.quantity,
                url: l.productVariant.product.slug,
                variantId: l.productVariant.id,
                productId: l.productVariant.productId,
                images: [
                    {
                        url: ((ref = l.featuredAsset) == null ? void 0 : ref.preview) + "?preset=thumb" || ""
                    }
                ],
                discounts: l.discounts.map((d)=>({
                        value: d.amount / 100
                    })),
                path: "",
                variant: {
                    id: l.productVariant.id,
                    name: l.productVariant.name,
                    sku: l.productVariant.sku,
                    price: l.discountedUnitPriceWithTax / 100,
                    listPrice: l.unitPriceWithTax / 100,
                    image: {
                        url: ((ref3 = l.featuredAsset) == null ? void 0 : ref3.preview) + "?preset=thumb" || ""
                    },
                    requiresShipping: true
                }
            };
        })
    };
}
