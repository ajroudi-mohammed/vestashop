import { normalize as normalizeProduct } from "../../utils/product";
export default function getProductOperation({ commerce  }) {
    async function getProduct({ config , variables  } = {}) {
        // Get fetch from the config
        const { restBuyerFetch  } = commerce.getConfig(config);
        // Get a single product
        const productPromise = restBuyerFetch("GET", `/me/products/${variables == null ? void 0 : variables.slug}`);
        // Get product specs
        const specsPromise = restBuyerFetch("GET", `/me/products/${variables == null ? void 0 : variables.slug}/specs`).then((res)=>res.Items);
        // Get product variants
        const variantsPromise = restBuyerFetch("GET", `/me/products/${variables == null ? void 0 : variables.slug}/variants`).then((res)=>res.Items);
        // Execute all promises in parallel
        const [product, specs, variants] = await Promise.all([
            productPromise,
            specsPromise,
            variantsPromise, 
        ]);
        // Hydrate product
        product.xp.Specs = specs;
        product.xp.Variants = variants;
        return {
            // Normalize product to commerce schema
            product: normalizeProduct(product)
        };
    }
    return getProduct;
};
