import { normalizeProduct } from "../utils/normalise-product";
export default function getProductOperation({ commerce  }) {
    async function getProduct({ query ="" , variables , config  } = {}) {
        // TODO: support locale
        const { sdk , locale  } = commerce.getConfig(config);
        const shopperProductsClient = await sdk.getshopperProductsClient();
        const product = await shopperProductsClient.getProduct({
            parameters: {
                id: variables == null ? void 0 : variables.slug
            }
        });
        const normalizedProduct = normalizeProduct(product);
        return {
            product: normalizedProduct
        };
    }
    return getProduct;
};
