import { normalizeCategory } from "../../utils/normalize-category";
export default function getSiteInfoOperation({ commerce  }) {
    async function getSiteInfo({ config  } = {}) {
        const { sdkFetch  } = commerce.getConfig(config);
        const { data: categories  } = await sdkFetch("categories", "list");
        const formattedCategories = categories.map(normalizeCategory);
        return {
            categories: formattedCategories,
            brands: []
        };
    }
    return getSiteInfo;
};
