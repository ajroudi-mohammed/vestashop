import { normalizeProduct } from "../../utils/normalize";
export default function getAllProductsOperation({ commerce  }) {
    async function getAllProducts({ config: cfg , variables ={
        first: 250
    }  } = {}) {
        const config = commerce.getConfig(cfg);
        const { results  } = await config.fetch("products", "list", [
            {
                limit: variables.first
            }, 
        ]);
        const products = results.map((product)=>normalizeProduct(product));
        return {
            products
        };
    }
    return getAllProducts;
};
