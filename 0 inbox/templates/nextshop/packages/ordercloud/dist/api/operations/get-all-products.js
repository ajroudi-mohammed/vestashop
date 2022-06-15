import { normalize as normalizeProduct } from "../../utils/product";
export default function getAllProductsOperation({ commerce  }) {
    async function getAllProducts({ config  } = {}) {
        // Get fetch from the config
        const { restBuyerFetch  } = commerce.getConfig(config);
        // Get all products
        const rawProducts = await restBuyerFetch("GET", "/me/products").then((response)=>response.Items);
        return {
            // Normalize products to commerce schema
            products: rawProducts.map(normalizeProduct)
        };
    }
    return getAllProducts;
};
