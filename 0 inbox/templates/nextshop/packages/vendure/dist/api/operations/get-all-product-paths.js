import { getAllProductPathsQuery } from "../../utils/queries/get-all-product-paths-query";
export default function getAllProductPathsOperation({ commerce  }) {
    async function getAllProductPaths({ query =getAllProductPathsQuery , variables , config: cfg  } = {}) {
        const config = commerce.getConfig(cfg);
        // RecursivePartial forces the method to check for every prop in the data, which is
        // required in case there's a custom `query`
        const { data  } = await config.fetch(query, {
            variables
        });
        const products = data.products.items;
        return {
            products: products.map((p)=>({
                    path: `/${p.slug}`
                }))
        };
    }
    return getAllProductPaths;
};
