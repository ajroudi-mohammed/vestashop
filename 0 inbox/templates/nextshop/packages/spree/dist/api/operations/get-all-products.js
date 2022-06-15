import normalizeProduct from "../../utils/normalizations/normalize-product";
import { requireConfigValue } from "../../isomorphic-config";
const imagesSize = requireConfigValue("imagesSize");
const imagesQuality = requireConfigValue("imagesQuality");
export default function getAllProductsOperation({ commerce  }) {
    async function getAllProducts({ variables: getAllProductsVariables = {} , config: userConfig  } = {}) {
        console.info("getAllProducts called. Configuration: ", "getAllProductsVariables: ", getAllProductsVariables, "config: ", userConfig);
        const defaultProductsTaxonomyId = requireConfigValue("allProductsTaxonomyId");
        const first = getAllProductsVariables.first;
        const filter = !defaultProductsTaxonomyId ? {} : {
            filter: {
                taxons: defaultProductsTaxonomyId
            },
            sort: "-updated_at"
        };
        const variables = {
            methodPath: "products.list",
            arguments: [
                {},
                {
                    include: "primary_variant,variants,images,option_types,variants.option_values",
                    per_page: first,
                    ...filter,
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
        const normalizedProducts = spreeSuccessResponse.data.map((spreeProduct)=>normalizeProduct(spreeSuccessResponse, spreeProduct));
        return {
            products: normalizedProducts
        };
    }
    return getAllProducts;
};
