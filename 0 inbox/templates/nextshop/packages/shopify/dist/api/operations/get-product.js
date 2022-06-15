import { normalizeProduct, getProductQuery } from "../../utils";
export default function getProductOperation({ commerce  }) {
    async function getProduct({ query =getProductQuery , variables , config: cfg  }) {
        const { fetch , locale  } = commerce.getConfig(cfg);
        const { data: { productByHandle  } ,  } = await fetch(query, {
            variables
        }, {
            ...locale && {
                headers: {
                    "Accept-Language": locale
                }
            }
        });
        return {
            ...productByHandle && {
                product: normalizeProduct(productByHandle)
            }
        };
    }
    return getProduct;
};
