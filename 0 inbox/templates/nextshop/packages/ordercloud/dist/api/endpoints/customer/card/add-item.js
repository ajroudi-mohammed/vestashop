import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET, {
    apiVersion: "2020-08-27"
});
const addItem = async ({ res: res1 , body: { item , cartId  } , config: { restBuyerFetch , restMiddlewareFetch  } ,  })=>{
    // Return an error if no item is present
    if (!item) {
        return res1.status(400).json({
            data: null,
            errors: [
                {
                    message: "Missing item"
                }
            ]
        });
    }
    // Return an error if no item is present
    if (!cartId) {
        return res1.status(400).json({
            data: null,
            errors: [
                {
                    message: "Cookie not found"
                }
            ]
        });
    }
    // Get token
    const token = await stripe.tokens.create({
        card: {
            number: item.cardNumber,
            exp_month: item.cardExpireDate.split("/")[0],
            exp_year: item.cardExpireDate.split("/")[1],
            cvc: item.cardCvc
        }
    }).then((res)=>res.id);
    // Register credit card
    const creditCard = await restBuyerFetch("POST", `/me/creditcards`, {
        Token: token,
        CardType: "credit",
        PartialAccountNumber: item.cardNumber.slice(-4),
        CardholderName: item.cardHolder,
        ExpirationDate: item.cardExpireDate
    }).then((response)=>response.ID);
    // Assign payment to order
    const payment = await restBuyerFetch("POST", `/orders/All/${cartId}/payments`, {
        Type: "CreditCard",
        CreditCardID: creditCard
    }).then((response)=>response.ID);
    // Accept payment to order
    await restMiddlewareFetch("PATCH", `/orders/All/${cartId}/payments/${payment}`, {
        Accepted: true
    });
    return res1.status(200).json({
        data: null,
        errors: []
    });
};
export default addItem;
