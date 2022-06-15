import filterEdges from "../utils/filter-edges";
import setProductLocaleMeta from "../utils/set-product-locale-meta";
import { productConnectionFragment } from "../fragments/product";
import { normalizeProduct } from "../../lib/normalize";
export const getAllProductsQuery = /* GraphQL */ `
  query getAllProducts(
    $hasLocale: Boolean = false
    $locale: String = "null"
    $entityIds: [Int!]
    $first: Int = 10
    $products: Boolean = false
    $featuredProducts: Boolean = false
    $bestSellingProducts: Boolean = false
    $newestProducts: Boolean = false
  ) {
    site {
      products(first: $first, entityIds: $entityIds) @include(if: $products) {
        ...productConnnection
      }
      featuredProducts(first: $first) @include(if: $featuredProducts) {
        ...productConnnection
      }
      bestSellingProducts(first: $first) @include(if: $bestSellingProducts) {
        ...productConnnection
      }
      newestProducts(first: $first) @include(if: $newestProducts) {
        ...productConnnection
      }
    }
  }

  ${productConnectionFragment}
`;
function getProductsType(relevance) {
    switch(relevance){
        case "featured":
            return "featuredProducts";
        case "best_selling":
            return "bestSellingProducts";
        case "newest":
            return "newestProducts";
        default:
            return "products";
    }
}
export default function getAllProductsOperation({ commerce  }) {
    async function getAllProducts({ query =getAllProductsQuery , variables: vars = {} , config: cfg  } = {}) {
        var ref, ref1;
        const config = commerce.getConfig(cfg);
        const { locale  } = config;
        const field = getProductsType(vars.relevance);
        const variables = {
            locale,
            hasLocale: !!locale
        };
        variables[field] = true;
        if (vars.first) variables.first = vars.first;
        if (vars.ids) variables.entityIds = vars.ids.map((id)=>Number(id));
        // RecursivePartial forces the method to check for every prop in the data, which is
        // required in case there's a custom `query`
        const { data  } = await config.fetch(query, {
            variables
        });
        const edges = (ref = data.site) == null ? void 0 : (ref1 = ref[field]) == null ? void 0 : ref1.edges;
        const products = filterEdges(edges);
        if (locale && config.applyLocale) {
            products.forEach((product)=>{
                if (product.node) setProductLocaleMeta(product.node);
            });
        }
        return {
            products: products.map(({ node  })=>normalizeProduct(node))
        };
    }
    return getAllProducts;
};
