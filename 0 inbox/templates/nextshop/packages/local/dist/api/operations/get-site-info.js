export default function getSiteInfoOperation({}) {
    function getSiteInfo({ query , variables , config: cfg  } = {}) {
        return Promise.resolve({
            categories: [
                {
                    id: "new-arrivals",
                    name: "New Arrivals",
                    slug: "new-arrivals",
                    path: "/new-arrivals"
                },
                {
                    id: "featured",
                    name: "Featured",
                    slug: "featured",
                    path: "/featured"
                }, 
            ],
            brands: []
        });
    }
    return getSiteInfo;
};
