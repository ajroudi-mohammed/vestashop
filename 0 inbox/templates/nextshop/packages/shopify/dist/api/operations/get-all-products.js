import getAllProductsQuery from "../../utils/queries/get-all-products-query";
import { normalizeProduct } from "../../utils";
export default function getAllProductsOperation({ commerce  }) {
    async function getAllProducts({ query =getAllProductsQuery , variables , config  } = {}) {
        const { fetch , locale  } = commerce.getConfig(config);
        const { data  } = await fetch(query, {
            variables
        }, {
            ...locale && {
                headers: {
                    "Accept-Language": locale
                }
            }
        });
        return {
            products: data.products.edges.map(({ node  })=>normalizeProduct(node))
        };
    }
    return getAllProducts;
};
