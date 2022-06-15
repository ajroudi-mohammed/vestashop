export default function getAllProductPathsOperation({ commerce  }) {
    async function getAllProductPaths({ config  } = {}) {
        // Get fetch from the config
        const { restBuyerFetch  } = commerce.getConfig(config);
        // Get all products
        const rawProducts = await restBuyerFetch("GET", "/me/products").then((response)=>response.Items);
        return {
            // Match a path for every product retrieved
            products: rawProducts.map((product)=>({
                    path: `/${product.ID}`
                }))
        };
    }
    return getAllProductPaths;
};
