import { normalizePage } from "../../lib/normalize";
import { getPageQuery } from "../queries/get-page-query";
export default function getPageOperation({ commerce  }) {
    async function getPage({ url , variables , config , preview  }) {
        var ref, ref1;
        // RecursivePartial forces the method to check for every prop in the data, which is
        // required in case there's a custom `url`
        const cfg = commerce.getConfig(config);
        const pageVariables = {
            documentListName: cfg.documentListName,
            filter: `id eq ${variables.id}`
        };
        const { data  } = await cfg.fetch(getPageQuery, {
            variables: pageVariables
        });
        const firstPage = (ref = data.documentListDocuments.items) == null ? void 0 : ref[0];
        const page = firstPage;
        if (preview || (page == null ? void 0 : (ref1 = page.properties) == null ? void 0 : ref1.is_visible)) {
            return {
                page: normalizePage(page)
            };
        }
        return {};
    }
    return getPage;
};
