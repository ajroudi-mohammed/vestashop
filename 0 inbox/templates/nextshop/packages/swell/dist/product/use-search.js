import useSearch from "@vercel/commerce/product/use-search";
import { normalizeProduct } from "../utils";
export default useSearch;
export const handler = {
    fetchOptions: {
        query: "products",
        method: "list"
    },
    async fetcher ({ input , options , fetch  }) {
        const sortMap = new Map([
            [
                "latest-desc",
                ""
            ],
            [
                "price-asc",
                "price_asc"
            ],
            [
                "price-desc",
                "price_desc"
            ],
            [
                "trending-desc",
                "popularity"
            ], 
        ]);
        const { categoryId , search , sort ="latest-desc"  } = input;
        const mappedSort = sortMap.get(sort);
        const { results , count: found  } = await fetch({
            query: "products",
            method: "list",
            variables: {
                category: categoryId,
                search,
                sort: mappedSort
            }
        });
        const products = results.map((product)=>normalizeProduct(product));
        return {
            products,
            found
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
