import { requireConfigValue } from "../../isomorphic-config";
import normalizePage from "../../utils/normalizations/normalize-page";
export default function getAllPagesOperation({ commerce  }) {
    async function getAllPages({ config: userConfig , preview , query , url  } = {}) {
        console.info("getAllPages called. Configuration: ", "query: ", query, "userConfig: ", userConfig, "preview: ", preview, "url: ", url);
        const config = commerce.getConfig(userConfig);
        const { fetch: apiFetch  } = config;
        const variables = {
            methodPath: "pages.list",
            arguments: [
                {
                    per_page: 500,
                    filter: {
                        locale_eq: config.locale || requireConfigValue("defaultLocale")
                    }
                }, 
            ]
        };
        const { data: spreeSuccessResponse  } = await apiFetch("__UNUSED__", {
            variables
        });
        const normalizedPages = spreeSuccessResponse.data.map((spreePage)=>normalizePage(spreeSuccessResponse, spreePage, config.locales || []));
        return {
            pages: normalizedPages
        };
    }
    return getAllPages;
};
