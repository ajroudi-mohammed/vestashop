export function formatCart(cart, lineItems) {
    var ref4, ref1;
    return {
        id: cart.ID,
        customerId: cart.FromUserID,
        email: cart.FromUser.Email,
        createdAt: cart.DateCreated,
        currency: {
            code: ((ref4 = cart.FromUser) == null ? void 0 : (ref1 = ref4.xp) == null ? void 0 : ref1.currency) ?? "USD"
        },
        taxesIncluded: cart.TaxCost === 0,
        lineItems: lineItems.map((lineItem)=>{
            var ref, ref2, ref3;
            return {
                id: lineItem.ID,
                variantId: lineItem.Variant ? String(lineItem.Variant.ID) : "",
                productId: lineItem.ProductID,
                name: lineItem.Product.Name,
                quantity: lineItem.Quantity,
                discounts: [],
                path: lineItem.ProductID,
                variant: {
                    id: lineItem.Variant ? String(lineItem.Variant.ID) : "",
                    sku: lineItem.ID,
                    name: lineItem.Product.Name,
                    image: {
                        url: (ref = lineItem.Product.xp) == null ? void 0 : (ref2 = ref.Images) == null ? void 0 : (ref3 = ref2[0]) == null ? void 0 : ref3.url
                    },
                    requiresShipping: Boolean(lineItem.ShippingAddress),
                    price: lineItem.UnitPrice,
                    listPrice: lineItem.UnitPrice
                }
            };
        }),
        lineItemsSubtotalPrice: cart.Subtotal,
        subtotalPrice: cart.Subtotal,
        totalPrice: cart.Total,
        discounts: []
    };
}
