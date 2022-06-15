import { getAllProductsQuery } from "../../utils";
export default function getAllProductPathsOperation({ commerce  }) {
    async function getAllProductPaths({ query =getAllProductsQuery , config , variables  } = {}) {
        config = commerce.getConfig(config);
        const { data  } = await config.fetch(query, {
            variables
        });
        return {
            products: data.products.edges.map(({ node: { handle  }  })=>({
                    path: `/${handle}`
                }))
        };
    }
    return getAllProductPaths;
};
