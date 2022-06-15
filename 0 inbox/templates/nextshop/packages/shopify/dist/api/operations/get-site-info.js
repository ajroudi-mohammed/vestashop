import { getCategories, getBrands, getSiteInfoQuery } from "../../utils";
export default function getSiteInfoOperation({ commerce  }) {
    async function getSiteInfo({ query =getSiteInfoQuery , config , variables  } = {}) {
        const cfg = commerce.getConfig(config);
        const categoriesPromise = getCategories(cfg);
        const brandsPromise = getBrands(cfg);
        /*
    const { fetch, locale } = cfg
    const { data } = await fetch<GetSiteInfoQuery, GetSiteInfoQueryVariables>(
      query,
      { variables },
      {
        ...(locale && {
          headers: {
            'Accept-Language': locale,
          },
        }),
      }
    )
    */ return {
            categories: await categoriesPromise,
            brands: await brandsPromise
        };
    }
    return getSiteInfo;
};
