import { getCategories, getVendors } from "../../utils";
export default function getSiteInfoOperation({ commerce  }) {
    async function getSiteInfo({ query , config , variables  } = {}) {
        const cfg = commerce.getConfig(config);
        const categories = await getCategories(cfg);
        const brands = await getVendors(cfg);
        return {
            categories,
            brands
        };
    }
    return getSiteInfo;
};
