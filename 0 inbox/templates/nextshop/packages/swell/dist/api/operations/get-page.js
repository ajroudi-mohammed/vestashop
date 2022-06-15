export default function getPageOperation({ commerce  }) {
    async function getPage({ variables , config  }) {
        const { fetch , locale ="en-US"  } = commerce.getConfig(config);
        const id = variables.id;
        const result = await fetch("content", "get", [
            "pages",
            id
        ]);
        const page = result;
        return {
            page: page ? {
                ...page,
                url: `/${locale}/${page.slug}`
            } : null
        };
    }
    return getPage;
};
