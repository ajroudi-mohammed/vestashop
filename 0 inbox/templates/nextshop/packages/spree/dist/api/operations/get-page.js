import normalizePage from "../../utils/normalizations/normalize-page";
export default function getPageOperation({ commerce  }) {
    async function getPage({ url , config: userConfig , preview , variables: getPageVariables  }) {
        console.info("getPage called. Configuration: ", "userConfig: ", userConfig, "preview: ", preview, "url: ", url);
        const config = commerce.getConfig(userConfig);
        const { fetch: apiFetch  } = config;
        const variables = {
            methodPath: "pages.show",
            arguments: [
                getPageVariables.id
            ]
        };
        const { data: spreeSuccessResponse  } = await apiFetch("__UNUSED__", {
            variables
        });
        const normalizedPage = normalizePage(spreeSuccessResponse, spreeSuccessResponse.data, config.locales || []);
        return {
            page: normalizedPage
        };
    }
    return getPage;
};
