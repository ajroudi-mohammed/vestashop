export default function getSiteInfoOperation({ commerce  }) {
    async function getSiteInfo({ config  } = {}) {
        // Get fetch from the config
        const { restBuyerFetch  } = commerce.getConfig(config);
        // Get list of categories
        const rawCategories = await restBuyerFetch("GET", `/me/categories`).then((response)=>response.Items);
        return {
            // Normalize categories
            categories: rawCategories.map((category)=>({
                    id: category.ID,
                    name: category.Name,
                    slug: category.ID,
                    path: `/${category.ID}`
                })),
            brands: []
        };
    }
    return getSiteInfo;
};
