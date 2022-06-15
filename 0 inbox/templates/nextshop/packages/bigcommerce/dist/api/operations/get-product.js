import setProductLocaleMeta from "../utils/set-product-locale-meta";
import { productInfoFragment } from "../fragments/product";
import { normalizeProduct } from "../../lib/normalize";
export const getProductQuery = /* GraphQL */ `
  query getProduct(
    $hasLocale: Boolean = false
    $locale: String = "null"
    $path: String!
  ) {
    site {
      route(path: $path) {
        node {
          __typename
          ... on Product {
            ...productInfo
            variants(first: 250) {
              edges {
                node {
                  entityId
                  defaultImage {
                    urlOriginal
                    altText
                    isDefault
                  }
                  prices {
                    ...productPrices
                  }
                  inventory {
                    aggregated {
                      availableToSell
                      warningLevel
                    }
                    isInStock
                  }
                  productOptions {
                    edges {
                      node {
                        __typename
                        entityId
                        displayName
                        ...multipleChoiceOption
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  ${productInfoFragment}
`;
// TODO: See if this type is useful for defining the Product type
// export type ProductNode = Extract<
//   GetProductQuery['site']['route']['node'],
//   { __typename: 'Product' }
// >
export default function getAllProductPathsOperation({ commerce  }) {
    async function getProduct({ query =getProductQuery , variables: { slug , ...vars } , config: cfg  }) {
        var ref, ref1;
        const config = commerce.getConfig(cfg);
        const { locale  } = config;
        const variables = {
            locale,
            hasLocale: !!locale,
            path: slug ? `/${slug}/` : vars.path
        };
        const { data  } = await config.fetch(query, {
            variables
        });
        const product = (ref = data.site) == null ? void 0 : (ref1 = ref.route) == null ? void 0 : ref1.node;
        if ((product == null ? void 0 : product.__typename) === "Product") {
            if (locale && config.applyLocale) {
                setProductLocaleMeta(product);
            }
            return {
                product: normalizeProduct(product)
            };
        }
        return {};
    }
    return getProduct;
};
