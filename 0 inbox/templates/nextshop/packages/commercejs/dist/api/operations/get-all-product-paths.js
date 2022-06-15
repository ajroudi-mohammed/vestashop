export default function getAllProductPathsOperation({ commerce  }) {
    async function getAllProductPaths({ config  } = {}) {
        const { sdkFetch  } = commerce.getConfig(config);
        const { data  } = await sdkFetch("products", "list");
        // Match a path for every product retrieved
        const productPaths = data.map(({ permalink  })=>({
                path: `/${permalink}`
            }));
        return {
            products: productPaths
        };
    }
    return getAllProductPaths;
};
