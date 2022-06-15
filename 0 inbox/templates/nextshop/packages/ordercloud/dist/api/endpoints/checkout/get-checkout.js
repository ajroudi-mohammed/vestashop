const getCheckout = async ({ req , res , body: { cartId  } , config: { restBuyerFetch , tokenCookie  } ,  })=>{
    // Return an error if no item is present
    if (!cartId) {
        return res.status(400).json({
            data: null,
            errors: [
                {
                    message: "Missing cookie"
                }
            ]
        });
    }
    // Get token from cookies
    const token = req.cookies[tokenCookie];
    // Register credit card
    const payments = await restBuyerFetch("GET", `/orders/Outgoing/${cartId}/payments`, null, {
        token
    }).then((response)=>response.Items);
    const address = await restBuyerFetch("GET", `/orders/Outgoing/${cartId}`, null, {
        token
    }).then((response)=>response.ShippingAddressID);
    // Return cart and errors
    res.status(200).json({
        data: {
            hasPayment: payments.length > 0,
            hasShipping: Boolean(address)
        },
        errors: []
    });
};
export default getCheckout;
