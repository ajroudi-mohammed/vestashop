import useSearch from "@vercel/commerce/product/use-search";
import { normalizeSearchResult } from "../utils/normalize";
import { searchQuery } from "../utils/queries/search-query";
export default useSearch;
export const handler = {
    fetchOptions: {
        query: searchQuery
    },
    async fetcher ({ input , options , fetch  }) {
        var ref;
        const { categoryId , brandId  } = input;
        const variables = {
            input: {
                term: input.search,
                collectionId: (ref = input.categoryId) == null ? void 0 : ref.toString(),
                groupByProduct: true
            }
        };
        const { search  } = await fetch({
            query: searchQuery,
            variables
        });
        return {
            found: search.totalItems > 0,
            products: search.items.map((item)=>normalizeSearchResult(item)) ?? []
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
