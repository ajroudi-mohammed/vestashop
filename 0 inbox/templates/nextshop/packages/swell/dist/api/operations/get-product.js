import { normalizeProduct } from "../../utils";
export default function getProductOperation({ commerce  }) {
    async function getProduct({ variables , config: cfg  }) {
        const config = commerce.getConfig(cfg);
        const product = await config.fetch("products", "get", [
            variables.slug
        ]);
        if (product && product.variants) {
            var ref;
            product.variants = (ref = product.variants) == null ? void 0 : ref.results;
        }
        return {
            product: product ? normalizeProduct(product) : null
        };
    }
    return getProduct;
};
