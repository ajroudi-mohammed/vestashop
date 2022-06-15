import getCustomerId from "../../utils/get-customer-id";
// Return wishlist info
const removeItem = async ({ res , body: { customerToken , itemId  } , config , commerce ,  })=>{
    const customerId = customerToken && await getCustomerId({
        customerToken,
        config
    });
    const { wishlist  } = customerId && await commerce.getCustomerWishlist({
        variables: {
            customerId
        },
        config
    }) || {};
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
    const result = await config.storeApiFetch(`/v3/wishlists/${wishlist.id}/items/${itemId}`, {
        method: "DELETE"
    });
    const data = (result == null ? void 0 : result.data) ?? null;
    res.status(200).json({
        data
    });
};
export default removeItem;
