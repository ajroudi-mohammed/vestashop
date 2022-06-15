import { normalizeSearchProducts } from "../utils/normalise-product";
export default function getAllProductsOperation({ commerce  }) {
    async function getAllProducts({ query ="" , variables , config  } = {}) {
        // TODO: support locale
        const { sdk , locale  } = commerce.getConfig(config);
        const searchClient = await sdk.getSearchClient();
        // use SDK search API for initial products
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
            products: products
        };
    }
    return getAllProducts;
};
