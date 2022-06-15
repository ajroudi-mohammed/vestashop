export default function getAllPagesOperation({ commerce  }) {
    async function getAllPages({ config , preview  } = {}) {
        const cfg = commerce.getConfig(config);
        // RecursivePartial forces the method to check for every prop in the data, which is
        // required in case there's a custom `url`
        const { data  } = await cfg.storeApiFetch("/v3/content/pages");
        const pages = data ?? [];
        return {
            pages: preview ? pages : pages.filter((p)=>p.is_visible)
        };
    }
    return getAllPages;
};
