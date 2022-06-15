import { getAllProductsQuery } from "../queries/get-all-products-query";
import { normalizeProduct } from "../../lib/normalize";
export default function getAllProductPathsOperation({ commerce  }) {
    async function getAllProductPaths({ config  } = {}) {
        const cfg = commerce.getConfig(config);
        const productVariables = {
            startIndex: 0,
            pageSize: 100
        };
        const { data  } = await cfg.fetch(getAllProductsQuery, {
            variables: productVariables
        });
        const normalizedProducts = data.products.items ? data.products.items.map((item)=>normalizeProduct(item, cfg)) : [];
        const products = normalizedProducts.map((product)=>({
                path: product.path
            }));
        return Promise.resolve({
            products: products
        });
    }
    return getAllProductPaths;
};
