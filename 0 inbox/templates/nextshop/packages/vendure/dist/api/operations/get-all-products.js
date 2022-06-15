import { normalizeSearchResult } from "../../utils/normalize";
import { getAllProductsQuery } from "../../utils/queries/get-all-products-query";
export default function getAllProductsOperation({ commerce  }) {
    async function getAllProducts({ query =getAllProductsQuery , variables: { ...vars } = {} , config: cfg  } = {}) {
        const config = commerce.getConfig(cfg);
        const variables = {
            input: {
                take: vars.first,
                groupByProduct: true
            }
        };
        const { data  } = await config.fetch(query, {
            variables
        });
        return {
            products: data.search.items.map((item)=>normalizeSearchResult(item))
        };
    }
    return getAllProducts;
};
