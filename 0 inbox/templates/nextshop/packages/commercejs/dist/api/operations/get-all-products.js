import { normalizeProduct } from "../../utils/normalize-product";
export default function getAllProductsOperation({ commerce  }) {
    async function getAllProducts({ config  } = {}) {
        const { sdkFetch  } = commerce.getConfig(config);
        const { data  } = await sdkFetch("products", "list", {
            sortBy: "sort_order"
        });
        const productsFormatted = (data == null ? void 0 : data.map((product)=>normalizeProduct(product))) || [];
        return {
            products: productsFormatted
        };
    }
    return getAllProducts;
};
