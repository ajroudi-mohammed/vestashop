import useSearch from "@vercel/commerce/product/use-search";
import { getProductSearchVariables } from "../utils/product-search";
import { normalizeProduct } from "../utils/normalize-product";
export default useSearch;
export const handler = {
    fetchOptions: {
        query: "products",
        method: "list"
    },
    async fetcher ({ input , options , fetch  }) {
        const { data , meta  } = await fetch({
            query: options.query,
            method: options.method,
            variables: getProductSearchVariables(input)
        });
        const formattedProducts = (data == null ? void 0 : data.map((product)=>normalizeProduct(product))) || [];
        return {
            products: formattedProducts,
            found: meta.pagination.total > 0
        };
    },
    useHook: ({ useData  })=>(input = {})=>{
            return useData({
                input: [
                    [
                        "search",
                        input.search
                    ],
                    [
                        "categoryId",
                        input.categoryId
                    ],
                    [
                        "brandId",
                        input.brandId
                    ],
                    [
                        "sort",
                        input.sort
                    ], 
                ],
                swrOptions: {
                    revalidateOnFocus: false,
                    ...input.swrOptions
                }
            });
        }
};
