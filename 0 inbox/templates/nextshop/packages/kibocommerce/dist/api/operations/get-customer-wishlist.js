// import getAllProducts, { ProductEdge } from './get-all-products'
import { getCustomerWishlistQuery } from "../queries/get-customer-wishlist-query";
export default function getCustomerWishlistOperation({ commerce  }) {
    async function getCustomerWishlist({ config , variables , includeProducts  }) {
        let customerWishlist = {};
        try {
            var ref;
            config = commerce.getConfig(config);
            const result = await (config == null ? void 0 : config.fetch(getCustomerWishlistQuery, {
                variables
            }));
            customerWishlist = result == null ? void 0 : (ref = result.data) == null ? void 0 : ref.customerWishlist;
        } catch (e) {
            customerWishlist = {};
        }
        return {
            wishlist: customerWishlist
        };
    }
    return getCustomerWishlist;
};
