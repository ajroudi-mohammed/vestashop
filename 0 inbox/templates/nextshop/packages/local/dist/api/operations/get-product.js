import data from "../../data.json";
export default function getProductOperation({ commerce  }) {
    async function getProduct({ query ="" , variables , config  } = {}) {
        return {
            product: data.products.find(({ slug  })=>slug === variables.slug)
        };
    }
    return getProduct;
};
