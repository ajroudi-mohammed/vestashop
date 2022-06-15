export default function getAllPagesOperation({ commerce  }) {
    async function getAllPages({ config: cfg , preview  } = {}) {
        const config = commerce.getConfig(cfg);
        return {
            pages: []
        };
    }
    return getAllPages;
};
