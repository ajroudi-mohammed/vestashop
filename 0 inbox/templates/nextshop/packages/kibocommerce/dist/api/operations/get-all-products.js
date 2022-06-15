import { getAllProductsQuery } from "../queries/get-all-products-query";
import { normalizeProduct } from "../../lib/normalize";
export default function getAllProductsOperation({ commerce  }) {
    async function getAllProducts({ query =getAllProductsQuery , variables , config  } = {}) {
        const cfg = commerce.getConfig(config);
        const { data  } = await cfg.fetch(query);
        let normalizedProducts = data.products.items ? data.products.items.map((item)=>normalizeProduct(item, cfg)) : [];
        return {
            products: normalizedProducts
        };
    }
    return getAllProducts;
};
