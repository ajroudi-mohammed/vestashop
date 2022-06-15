export const parseWishlistItem = (item)=>({
        product_id: Number(item.productId),
        variant_id: Number(item.variantId)
    });
export const parseCartItem = (item)=>({
        quantity: item.quantity,
        product_id: Number(item.productId),
        variant_id: Number(item.variantId),
        option_selections: item.optionSelections
    });
