import { normalizePage } from "../../utils";
import getPageQuery from "../../utils/queries/get-page-query";
export default function getPageOperation({ commerce  }) {
    async function getPage({ query =getPageQuery , variables , config  }) {
        const { fetch , locale  } = commerce.getConfig(config);
        const { data: { node: page  } ,  } = await fetch(query, {
            variables
        }, {
            ...locale && {
                headers: {
                    "Accept-Language": locale
                }
            }
        });
        return page ? {
            page: normalizePage(page, locale)
        } : {};
    }
    return getPage;
};
