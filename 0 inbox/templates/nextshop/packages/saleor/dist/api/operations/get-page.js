import * as Query from "../../utils/queries";
export default function getPageOperation({ commerce  }) {
    async function getPage({ query =Query.PageOne , variables , config  }) {
        const { fetch , locale ="en-US"  } = commerce.getConfig(config);
        const { data: { page  } ,  } = await fetch(query, {
            variables
        }, {
            ...locale && {
                headers: {
                    "Accept-Language": locale
                }
            }
        });
        return {
            page: page ? {
                ...page,
                name: page.title,
                url: `/${locale}/${page.slug}`
            } : null
        };
    }
    return getPage;
};
