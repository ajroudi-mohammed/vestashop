import MissingSlugVariableError from "../../errors/MissingSlugVariableError";
import normalizeProduct from "../../utils/normalizations/normalize-product";
import { requireConfigValue } from "../../isomorphic-config";
const imagesSize = requireConfigValue("imagesSize");
const imagesQuality = requireConfigValue("imagesQuality");
export default function getProductOperation({ commerce  }) {
    async function getProduct({ query ="" , variables: getProductVariables , config: userConfig  }) {
        console.log("getProduct called. Configuration: ", "getProductVariables: ", getProductVariables, "config: ", userConfig);
        if (!(getProductVariables == null ? void 0 : getProductVariables.slug)) {
            throw new MissingSlugVariableError();
        }
        const variables = {
            methodPath: "products.show",
            arguments: [
                getProductVariables.slug,
                {},
                {
                    include: "primary_variant,variants,images,option_types,variants.option_values",
                    image_transformation: {
                        quality: imagesQuality,
                        size: imagesSize
                    }
                }, 
            ]
        };
        const config = commerce.getConfig(userConfig);
        const { fetch: apiFetch  } = config // TODO: Send config.locale to Spree.
        ;
        const { data: spreeSuccessResponse  } = await apiFetch("__UNUSED__", {
            variables
        });
        return {
            product: normalizeProduct(spreeSuccessResponse, spreeSuccessResponse.data)
        };
    }
    return getProduct;
};
