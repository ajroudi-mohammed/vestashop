import { normalizePages } from "../../utils";
import getAllPagesQuery from "../../utils/queries/get-all-pages-query";
export default function getAllPagesOperation({ commerce  }) {
    async function getAllPages({ query =getAllPagesQuery , config , variables  } = {}) {
        const { fetch , locale: locale1 , locales =[
            "en-US",
            "es"
        ] ,  } = commerce.getConfig(config);
        const { data  } = await fetch(query, {
            variables
        }, {
            ...locale1 && {
                headers: {
                    "Accept-Language": locale1
                }
            }
        });
        return {
            pages: locales.reduce((arr, locale)=>arr.concat(normalizePages(data.pages.edges, locale)), [])
        };
    }
    return getAllPages;
};
