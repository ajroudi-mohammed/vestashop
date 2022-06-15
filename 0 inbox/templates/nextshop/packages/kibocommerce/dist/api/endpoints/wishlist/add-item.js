import getCustomerId from "../../utils/get-customer-id";
import { normalizeWishlistItem } from "../../../lib/normalize";
import { getProductQuery } from "../../../api/queries/get-product-query";
import addItemToWishlistMutation from "../../mutations/addItemToWishlist-mutation";
import createWishlist from "../../mutations/create-wishlist-mutation";
// Return wishlist info
const buildAddToWishlistVariables = ({ productId , variantId , productResponse , wishlist  })=>{
    var ref1;
    const { product  } = productResponse.data;
    const selectedOptions = (ref1 = product.variations) == null ? void 0 : ref1.find((v)=>v.productCode === variantId).options;
    const quantity = 1;
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
        wishlistId: wishlist == null ? void 0 : wishlist.id,
        wishlistItemInput: {
            quantity,
            product: {
                productCode: productId,
                variationProductCode: variantId ? variantId : null,
                options
            }
        }
    };
};
const addItem = async ({ res , body: { customerToken , item: item1  } , config , commerce ,  })=>{
    var ref, ref2;
    const token = customerToken ? Buffer.from(customerToken, "base64").toString("ascii") : null;
    const accessToken = token ? JSON.parse(token).accessToken : null;
    let result = {};
    let wishlist;
    if (!item1) {
        return res.status(400).json({
            data: null,
            errors: [
                {
                    message: "Missing item"
                }
            ]
        });
    }
    const customerId = customerToken && await getCustomerId({
        customerToken,
        config
    });
    const wishlistName = config.defaultWishlistName;
    if (!customerId) {
        return res.status(400).json({
            data: null,
            errors: [
                {
                    message: "Invalid request"
                }
            ]
        });
    }
    const wishlistResponse = await commerce.getCustomerWishlist({
        variables: {
            customerId,
            wishlistName
        },
        config
    });
    wishlist = wishlistResponse == null ? void 0 : wishlistResponse.wishlist;
    if (Object.keys(wishlist).length === 0) {
        var ref3;
        const createWishlistResponse = await config.fetch(createWishlist, {
            variables: {
                wishlistInput: {
                    customerAccountId: customerId,
                    name: wishlistName
                }
            }
        }, {
            headers: {
                "x-vol-user-claims": accessToken
            }
        });
        wishlist = createWishlistResponse == null ? void 0 : (ref3 = createWishlistResponse.data) == null ? void 0 : ref3.createWishlist;
    }
    const productResponse = await config.fetch(getProductQuery, {
        variables: {
            productCode: item1 == null ? void 0 : item1.productId
        }
    });
    const addItemToWishlistResponse = await config.fetch(addItemToWishlistMutation, {
        variables: buildAddToWishlistVariables({
            ...item1,
            productResponse,
            wishlist
        })
    }, {
        headers: {
            "x-vol-user-claims": accessToken
        }
    });
    if (addItemToWishlistResponse == null ? void 0 : (ref = addItemToWishlistResponse.data) == null ? void 0 : ref.createWishlistItem) {
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
export default addItem;
