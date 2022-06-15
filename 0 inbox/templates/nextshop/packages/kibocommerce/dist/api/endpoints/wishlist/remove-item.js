import getCustomerId from "../../utils/get-customer-id";
import { normalizeWishlistItem } from "../../../lib/normalize";
import removeItemFromWishlistMutation from "../../mutations/removeItemFromWishlist-mutation";
// Return wishlist info
const removeItem = async ({ res , body: { customerToken , itemId  } , config , commerce ,  })=>{
    var ref, ref1, ref2;
    const token = customerToken ? Buffer.from(customerToken, "base64").toString("ascii") : null;
    const accessToken = token ? JSON.parse(token).accessToken : null;
    let result = {};
    let wishlist;
    const customerId = customerToken && await getCustomerId({
        customerToken,
        config
    });
    const wishlistName = config.defaultWishlistName;
    const wishlistResponse = await commerce.getCustomerWishlist({
        variables: {
            customerId,
            wishlistName
        },
        config
    });
    wishlist = wishlistResponse == null ? void 0 : wishlistResponse.wishlist;
    if (!wishlist || !itemId) {
        return res.status(400).json({
            data: null,
            errors: [
                {
                    message: "Invalid request"
                }
            ]
        });
    }
    const removedItem = wishlist == null ? void 0 : (ref = wishlist.items) == null ? void 0 : ref.find((item)=>{
        return item.product.productCode === itemId;
    });
    const removeItemFromWishlistResponse = await config.fetch(removeItemFromWishlistMutation, {
        variables: {
            wishlistId: wishlist == null ? void 0 : wishlist.id,
            wishlistItemId: removedItem == null ? void 0 : removedItem.id
        }
    }, {
        headers: {
            "x-vol-user-claims": accessToken
        }
    });
    if (removeItemFromWishlistResponse == null ? void 0 : (ref1 = removeItemFromWishlistResponse.data) == null ? void 0 : ref1.deleteWishlistItem) {
        const wishlistResponse = await commerce.getCustomerWishlist({
            variables: {
                customerId,
                wishlistName
            },
            config
        });
        wishlist = wishlistResponse == null ? void 0 : wishlistResponse.wishlist;
    }
    result = {
        data: {
            ...wishlist,
            items: wishlist == null ? void 0 : (ref2 = wishlist.items) == null ? void 0 : ref2.map((item)=>normalizeWishlistItem(item, config))
        }
    };
    res.status(200).json({
        data: result == null ? void 0 : result.data
    });
};
export default removeItem;
