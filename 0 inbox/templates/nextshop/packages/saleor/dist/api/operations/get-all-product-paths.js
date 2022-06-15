import { getAllProductsPathsQuery } from "../../utils/queries";
import fetchAllProducts from "../utils/fetch-all-products";
export default function getAllProductPathsOperation({ commerce  }) {
    async function getAllProductPaths({ query , config , variables  } = {}) {
        config = commerce.getConfig(config);
        const products = await fetchAllProducts({
            config,
            query: getAllProductsPathsQuery,
            variables
        });
        return {
            products: products == null ? void 0 : products.map(({ node: { slug  }  })=>({
                    path: `/${slug}`
                }))
        };
    }
    return getAllProductPaths;
};
