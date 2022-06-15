import { normalizeSearchProducts } from "../utils/normalise-product";
export default function getAllProductPathsOperation({ commerce  }) {
    async function getAllProductPaths({ query , config , variables  } = {}) {
        // TODO: support locale
        const { sdk , locale  } = commerce.getConfig(config);
        const searchClient = await sdk.getSearchClient();
        // use SDK search API for initial products same as getAllProductsOperation
        const searchResults = await searchClient.productSearch({
            parameters: {
                q: "dress",
                limit: variables == null ? void 0 : variables.first
            }
        });
        let products = [];
        if (searchResults.total) {
            products = normalizeSearchProducts(searchResults.hits);
        }
        return {
            products: products == null ? void 0 : products.map(({ slug  })=>({
                    path: `/${slug}`
                }))
        };
    }
    return getAllProductPaths;
};
