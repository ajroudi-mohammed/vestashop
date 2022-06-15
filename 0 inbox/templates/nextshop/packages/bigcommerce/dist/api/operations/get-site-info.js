import filterEdges from "../utils/filter-edges";
import { categoryTreeItemFragment } from "../fragments/category-tree";
import { normalizeCategory } from "../../lib/normalize";
// Get 3 levels of categories
export const getSiteInfoQuery = /* GraphQL */ `
  query getSiteInfo {
    site {
      categoryTree {
        ...categoryTreeItem
        children {
          ...categoryTreeItem
          children {
            ...categoryTreeItem
          }
        }
      }
      brands {
        pageInfo {
          startCursor
          endCursor
        }
        edges {
          cursor
          node {
            entityId
            name
            defaultImage {
              urlOriginal
              altText
            }
            pageTitle
            metaDesc
            metaKeywords
            searchKeywords
            path
          }
        }
      }
    }
  }
  ${categoryTreeItemFragment}
`;
export default function getSiteInfoOperation({ commerce  }) {
    async function getSiteInfo({ query =getSiteInfoQuery , config  } = {}) {
        var ref, ref1;
        const cfg = commerce.getConfig(config);
        const { data  } = await cfg.fetch(query);
        const categories = data.site.categoryTree.map(normalizeCategory);
        const brands = (ref = data.site) == null ? void 0 : (ref1 = ref.brands) == null ? void 0 : ref1.edges;
        return {
            categories: categories ?? [],
            brands: filterEdges(brands)
        };
    }
    return getSiteInfo;
};
