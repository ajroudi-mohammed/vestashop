import { requireConfigValue } from "../../isomorphic-config";
const taxonsSort = (spreeTaxon1, spreeTaxon2)=>{
    const { left: left1 , right: right1  } = spreeTaxon1.attributes;
    const { left: left2 , right: right2  } = spreeTaxon2.attributes;
    if (right1 < left2) {
        return -1;
    }
    if (right2 < left1) {
        return 1;
    }
    return 0;
};
export default function getSiteInfoOperation({ commerce  }) {
    async function getSiteInfo({ query , variables: getSiteInfoVariables = {} , config: userConfig  } = {}) {
        console.info("getSiteInfo called. Configuration: ", "query: ", query, "getSiteInfoVariables ", getSiteInfoVariables, "config: ", userConfig);
        const createVariables = (parentPermalink)=>({
                methodPath: "taxons.list",
                arguments: [
                    {
                        filter: {
                            parent_permalink: parentPermalink
                        }
                    }, 
                ]
            });
        const config = commerce.getConfig(userConfig);
        const { fetch: apiFetch  } = config // TODO: Send config.locale to Spree.
        ;
        const { data: spreeCategoriesSuccessResponse  } = await apiFetch("__UNUSED__", {
            variables: createVariables(requireConfigValue("categoriesTaxonomyPermalink"))
        });
        const { data: spreeBrandsSuccessResponse  } = await apiFetch("__UNUSED__", {
            variables: createVariables(requireConfigValue("brandsTaxonomyPermalink"))
        });
        const normalizedCategories = spreeCategoriesSuccessResponse.data.sort(taxonsSort).map((spreeTaxon)=>{
            return {
                id: spreeTaxon.id,
                name: spreeTaxon.attributes.name,
                slug: spreeTaxon.id,
                path: spreeTaxon.id
            };
        });
        const normalizedBrands = spreeBrandsSuccessResponse.data.sort(taxonsSort).map((spreeTaxon)=>{
            return {
                node: {
                    entityId: spreeTaxon.id,
                    path: `brands/${spreeTaxon.id}`,
                    name: spreeTaxon.attributes.name
                }
            };
        });
        return {
            categories: normalizedCategories,
            brands: normalizedBrands
        };
    }
    return getSiteInfo;
};
