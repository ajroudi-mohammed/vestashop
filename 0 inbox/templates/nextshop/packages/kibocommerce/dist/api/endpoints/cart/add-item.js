import { normalizeCart } from "../../../lib/normalize";
import addToCurrentCartMutation from "../../../api/mutations/addToCart-mutation";
import { getProductQuery } from "../../../api/queries/get-product-query";
import { getCartQuery } from "../../../api/queries/get-cart-query";
import CookieHandler from "../../../api/utils/cookie-handler";
const buildAddToCartVariables = ({ productId , variantId , quantity =1 , productResponse  })=>{
    var ref1;
    const { product  } = productResponse.data;
    const selectedOptions = (ref1 = product.variations) == null ? void 0 : ref1.find((v)=>v.productCode === variantId).options;
    let options = [];
    selectedOptions == null ? void 0 : selectedOptions.forEach((each)=>{
        product == null ? void 0 : product.options.filter((option)=>{
            return option.attributeFQN == each.attributeFQN;
        }).forEach((po)=>{
            var ref;
            options.push({
                attributeFQN: po.attributeFQN,
                name: po.attributeDetail.name,
                value: (ref = po.values) == null ? void 0 : ref.find((v)=>v.value == each.value).value
            });
        });
    });
    return {
        productToAdd: {
            product: {
                productCode: productId,
                variationProductCode: variantId ? variantId : null,
                options
            },
            quantity,
            fulfillmentMethod: "Ship"
        }
    };
};
const addItem = async ({ req , res , body: { cartId , item  } , config ,  })=>{
    if (!item) {
        return res.status(400).json({
            data: null,
            errors: [
                {
                    message: "Missing item"
                }
            ]
        });
    }
    if (!item.quantity) item.quantity = 1;
    const productResponse = await config.fetch(getProductQuery, {
        variables: {
            productCode: item == null ? void 0 : item.productId
        }
    });
    const cookieHandler = new CookieHandler(config, req, res);
    let accessToken = null;
    if (!cookieHandler.getAccessToken()) {
        let anonymousShopperTokenResponse = await cookieHandler.getAnonymousToken();
        accessToken = anonymousShopperTokenResponse.accessToken;
    } else {
        accessToken = cookieHandler.getAccessToken();
    }
    const addToCartResponse = await config.fetch(addToCurrentCartMutation, {
        variables: buildAddToCartVariables({
            ...item,
            productResponse
        })
    }, {
        headers: {
            "x-vol-user-claims": accessToken
        }
    });
    let currentCart = null;
    if (addToCartResponse.data.addItemToCurrentCart) {
        var ref;
        let result = await config.fetch(getCartQuery, {}, {
            headers: {
                "x-vol-user-claims": accessToken
            }
        });
        currentCart = result == null ? void 0 : (ref = result.data) == null ? void 0 : ref.currentCart;
    }
    res.status(200).json({
        data: normalizeCart(currentCart)
    });
};
export default addItem;
