import data from "../../data.json";
export default function getAllProductsOperation({ commerce  }) {
    async function getAllProducts({ query ="" , variables , config  } = {}) {
        return {
            products: data.products
        };
    }
    return getAllProducts;
};
