import * as Query from "../../utils/queries";
export default function getAllPagesOperation({ commerce  }) {
    async function getAllPages({ query =Query.PageMany , config , variables  } = {}) {
        var ref, ref1;
        const { fetch , locale , locales =[
            "en-US"
        ]  } = commerce.getConfig(config);
        const { data  } = await fetch(query, {
            variables
        }, {
            ...locale && {
                headers: {
                    "Accept-Language": locale
                }
            }
        });
        const pages = (ref = data.pages) == null ? void 0 : (ref1 = ref.edges) == null ? void 0 : ref1.map(({ node: { title: name , slug , ...node }  })=>({
                ...node,
                url: `/${locale}/${slug}`,
                name
            }));
        return {
            pages
        };
    }
    return getAllPages;
};
