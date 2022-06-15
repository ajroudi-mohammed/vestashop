export default function getAllProductPathsOperation({ commerce  }) {
    async function getAllProductPaths({ variables , config: cfg  } = {}) {
        const config = commerce.getConfig(cfg);
        // RecursivePartial forces the method to check for every prop in the data, which is
        // required in case there's a custom `query`
        const { results  } = await config.fetch("products", "list", [
            {
                limit: variables == null ? void 0 : variables.first
            }, 
        ]);
        return {
            products: results == null ? void 0 : results.map(({ slug: handle  })=>({
                    path: `/${handle}`
                }))
        };
    }
    return getAllProductPaths;
};
