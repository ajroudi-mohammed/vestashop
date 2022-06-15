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
                    id: "womens-clothing-dresses",
                    name: "Womens Clothing Dresses",
                    slug: "womens-clothing-dresses",
                    path: "/womens-clothing-dresses"
                }, 
            ],
            brands: []
        });
    }
    return getSiteInfo;
};
