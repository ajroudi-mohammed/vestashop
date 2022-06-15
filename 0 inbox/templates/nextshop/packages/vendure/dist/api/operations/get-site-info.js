import { arrayToTree } from "../../utils/array-to-tree";
import { getCollectionsQuery } from "../../utils/queries/get-collections-query";
export default function getSiteInfoOperation({ commerce  }) {
    async function getSiteInfo({ query =getCollectionsQuery , variables , config: cfg  } = {}) {
        var ref;
        const config = commerce.getConfig(cfg);
        // RecursivePartial forces the method to check for every prop in the data, which is
        // required in case there's a custom `query`
        const { data  } = await config.fetch(query, {
            variables
        });
        const collections = (ref = data.collections) == null ? void 0 : ref.items.map((i)=>({
                ...i,
                entityId: i.id,
                path: i.slug,
                productCount: i.productVariants.totalItems
            }));
        const categories = arrayToTree(collections).children;
        const brands = [];
        return {
            categories: categories ?? [],
            brands
        };
    }
    return getSiteInfo;
};
