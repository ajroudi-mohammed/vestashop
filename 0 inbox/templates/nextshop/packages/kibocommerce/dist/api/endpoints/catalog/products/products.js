import productSearchQuery from "../../../queries/product-search-query";
import { buildProductSearchVars } from "../../../../lib/product-search-vars";
import { normalizeProduct } from "../../../../lib/normalize";
const getProducts = async ({ res , body: { search , categoryId , brandId , sort  } , config ,  })=>{
    var ref, ref1, ref2;
    const pageSize = 100;
    const filters = {};
    const startIndex = 0;
    const variables = buildProductSearchVars({
        categoryCode: categoryId,
        pageSize,
        search,
        sort,
        filters,
        startIndex
    });
    const { data  } = await config.fetch(productSearchQuery, {
        variables
    });
    const found = (data == null ? void 0 : (ref = data.products) == null ? void 0 : (ref1 = ref.items) == null ? void 0 : ref1.length) > 0 ? true : false;
    let productsResponse = data == null ? void 0 : (ref2 = data.products) == null ? void 0 : ref2.items.map((item)=>normalizeProduct(item, config));
    const products = found ? productsResponse : [];
    res.status(200).json({
        data: {
            products,
            found
        }
    });
};
export default getProducts;
