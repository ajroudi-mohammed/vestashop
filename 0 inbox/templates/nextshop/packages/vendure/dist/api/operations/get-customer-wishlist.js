export default function getCustomerWishlistOperation({ commerce  }) {
    async function getCustomerWishlist({ config: cfg , variables , includeProducts  }) {
        // Not implemented as Vendure does not ship with wishlist functionality at present
        const config = commerce.getConfig(cfg);
        return {
            wishlist: {}
        };
    }
    return getCustomerWishlist;
};
