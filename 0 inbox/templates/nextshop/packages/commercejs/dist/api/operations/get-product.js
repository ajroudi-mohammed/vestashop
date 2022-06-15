import { normalizeProduct } from "../../utils/normalize-product";
export default function getProductOperation({ commerce  }) {
    async function getProduct({ config , variables  } = {}) {
        const { sdkFetch  } = commerce.getConfig(config);
        // Fetch a product by its permalink.
        const product = await sdkFetch("products", "retrieve", (variables == null ? void 0 : variables.slug) || "", {
            type: "permalink"
        });
        const { data: variants  } = await sdkFetch("products", "getVariants", product.id);
        const productFormatted = normalizeProduct(product, variants);
        return {
            product: productFormatted
        };
    }
    return getProduct;
};
