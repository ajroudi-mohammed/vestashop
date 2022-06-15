export default function getPageOperation({ commerce  }) {
    async function getPage({ url , variables , config: cfg , preview  }) {
        const config = commerce.getConfig(cfg);
        return {};
    }
    return getPage;
};
