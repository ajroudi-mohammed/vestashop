import getCustomerId from "../../utils/get-customer-id";
import { normalizeWishlistItem } from "../../../lib/normalize";
// Return wishlist info
const getWishlist = async ({ res , body: { customerToken , includeProducts  } , config , commerce ,  })=>{
    let result = {};
    if (customerToken) {
        var ref;
        const customerId = customerToken && await getCustomerId({
            customerToken,
            config
        });
        const wishlistName = config.defaultWishlistName;
        if (!customerId) {
            // If the customerToken is invalid, then this request is too
            return res.status(404).json({
                data: null,
                errors: [
                    {
                        message: "Wishlist not found"
                    }
                ]
            });
        }
        const { wishlist  } = await commerce.getCustomerWishlist({
            variables: {
                customerId,
                wishlistName
            },
            includeProducts,
            config
        });
        result = {
            data: {
                ...wishlist,
                items: wishlist == null ? void 0 : (ref = wishlist.items) == null ? void 0 : ref.map((item)=>normalizeWishlistItem(item, config, includeProducts))
            }
        };
    }
    res.status(200).json({
        data: (result == null ? void 0 : result.data) ?? null
    });
};
export default getWishlist;
