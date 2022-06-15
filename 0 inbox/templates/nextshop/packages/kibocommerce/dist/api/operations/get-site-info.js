import { categoryTreeQuery } from "../queries/get-categories-tree-query";
import { normalizeCategory } from "../../lib/normalize";
export default function getSiteInfoOperation({ commerce  }) {
    async function getSiteInfo({ query =categoryTreeQuery , variables , config  } = {}) {
        const cfg = commerce.getConfig(config);
        const { data  } = await cfg.fetch(query);
        const categories = data.categories.items.map(normalizeCategory);
        return Promise.resolve({
            categories: categories ?? [],
            brands: []
        });
    }
    return getSiteInfo;
};
