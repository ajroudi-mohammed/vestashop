import { normalizeProduct } from "../../utils";
import * as Query from "../../utils/queries";
export default function getProductOperation({ commerce  }) {
    async function getProduct({ query =Query.ProductOneBySlug , variables , config: cfg  }) {
        const { fetch , locale  } = commerce.getConfig(cfg);
        const { data  } = await fetch(query, {
            variables
        }, {
            ...locale && {
                headers: {
                    "Accept-Language": locale
                }
            }
        });
        return {
            product: (data == null ? void 0 : data.product) ? normalizeProduct(data.product) : null
        };
    }
    return getProduct;
};
