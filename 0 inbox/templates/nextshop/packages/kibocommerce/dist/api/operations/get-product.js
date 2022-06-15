import { getProductQuery } from "../queries/get-product-query";
import { normalizeProduct } from "../../lib/normalize";
export default function getProductOperation({ commerce  }) {
    async function getProduct({ query =getProductQuery , variables , config  } = {}) {
        const productVariables = {
            productCode: variables == null ? void 0 : variables.slug
        };
        const cfg = commerce.getConfig(config);
        const { data  } = await cfg.fetch(query, {
            variables: productVariables
        });
        const normalizedProduct = normalizeProduct(data.product, cfg);
        return {
            product: normalizedProduct
        };
    }
    return getProduct;
};
