import { requireConfigValue } from "../../isomorphic-config";
import getProductPath from "../../utils/get-product-path";
const imagesSize = requireConfigValue("imagesSize");
const imagesQuality = requireConfigValue("imagesQuality");
export default function getAllProductPathsOperation({ commerce  }) {
    async function getAllProductPaths({ query , variables: getAllProductPathsVariables = {} , config: userConfig  } = {}) {
        console.info("getAllProductPaths called. Configuration: ", "query: ", query, "getAllProductPathsVariables: ", getAllProductPathsVariables, "config: ", userConfig);
        const productsCount = requireConfigValue("lastUpdatedProductsPrerenderCount");
        if (productsCount === 0) {
            return {
                products: []
            };
        }
        const variables = {
            methodPath: "products.list",
            arguments: [
                {},
                {
                    fields: {
                        product: "slug"
                    },
                    per_page: productsCount,
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
        const normalizedProductsPaths = spreeSuccessResponse.data.map((spreeProduct)=>({
                path: getProductPath(spreeProduct)
            }));
        return {
            products: normalizedProductsPaths
        };
    }
    return getAllProductPaths;
};
