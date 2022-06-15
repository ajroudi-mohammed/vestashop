import { normalizePage } from "../../lib/normalize";
export default function getPageOperation({ commerce  }) {
    async function getPage({ url , variables , config , preview  }) {
        const cfg = commerce.getConfig(config);
        // RecursivePartial forces the method to check for every prop in the data, which is
        // required in case there's a custom `url`
        const { data  } = await cfg.storeApiFetch(url || `/v3/content/pages?id=${variables.id}&include=body`);
        const firstPage = data == null ? void 0 : data[0];
        const page = firstPage;
        if (preview || (page == null ? void 0 : page.is_visible)) {
            return {
                page: normalizePage(page)
            };
        }
        return {};
    }
    return getPage;
};
