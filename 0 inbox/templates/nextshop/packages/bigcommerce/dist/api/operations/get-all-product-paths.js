import filterEdges from "../utils/filter-edges";
export const getAllProductPathsQuery = /* GraphQL */ `
  query getAllProductPaths($first: Int = 100) {
    site {
      products(first: $first) {
        edges {
          node {
            path
          }
        }
      }
    }
  }
`;
export default function getAllProductPathsOperation({ commerce  }) {
    async function getAllProductPaths({ query =getAllProductPathsQuery , variables , config  } = {}) {
        var ref, ref1;
        config = commerce.getConfig(config);
        // RecursivePartial forces the method to check for every prop in the data, which is
        // required in case there's a custom `query`
        const { data  } = await config.fetch(query, {
            variables
        });
        const products = (ref = data.site) == null ? void 0 : (ref1 = ref.products) == null ? void 0 : ref1.edges;
        return {
            products: filterEdges(products).map(({ node  })=>node)
        };
    }
    return getAllProductPaths;
};
