import getCategories from "../../utils/get-categories";
import getVendors from "../../utils/get-vendors";
export default function getSiteInfoOperation({ commerce  }) {
    async function getSiteInfo({ variables , config: cfg  } = {}) {
        const config = commerce.getConfig(cfg);
        const categories = await getCategories(config);
        const brands = await getVendors(config);
        return {
            categories,
            brands
        };
    }
    return getSiteInfo;
};
