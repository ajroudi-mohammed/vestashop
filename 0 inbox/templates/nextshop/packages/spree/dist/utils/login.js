import { getCartToken, removeCartToken } from "./tokens/cart-token";
import { setUserTokenResponse } from "./tokens/user-token-response";
const login = async (fetch, getTokenParameters, associateGuestCart)=>{
    const { data: spreeGetTokenSuccessResponse  } = await fetch({
        variables: {
            methodPath: "authentication.getToken",
            arguments: [
                getTokenParameters
            ]
        }
    });
    setUserTokenResponse(spreeGetTokenSuccessResponse);
    if (associateGuestCart) {
        const cartToken = getCartToken();
        if (cartToken) {
            // If the user had a cart as guest still use its contents
            // after logging in.
            const accessToken = spreeGetTokenSuccessResponse.access_token;
            const token = {
                bearerToken: accessToken
            };
            const associateGuestCartParameters = {
                guest_order_token: cartToken
            };
            await fetch({
                variables: {
                    methodPath: "cart.associateGuestCart",
                    arguments: [
                        token,
                        associateGuestCartParameters
                    ]
                }
            });
        // We no longer need the guest cart token, so let's remove it.
        }
    }
    removeCartToken();
};
export default login;
