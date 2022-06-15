import useSearch from "@vercel/commerce/product/use-search";
import { getSearchVariables, normalizeProduct } from "../utils";
import * as query from "../utils/queries";
export default useSearch;
export const handler = {
    fetchOptions: {
        query: query.ProductMany
    },
    async fetcher ({ input , options , fetch  }) {
        const { categoryId , brandId  } = input;
        const data = await fetch({
            query: categoryId ? query.CollectionOne : options.query,
            method: options == null ? void 0 : options.method,
            variables: getSearchVariables(input)
        });
        let edges;
        if (categoryId) {
            var ref, ref1;
            edges = ((ref = data.collection) == null ? void 0 : (ref1 = ref.products) == null ? void 0 : ref1.edges) ?? [];
        // FIXME @zaiste, no `vendor` in Saleor
        // if (brandId) {
        //   edges = edges.filter(
        //     ({ node: { vendor } }: ProductCountableEdge) =>
        //       vendor.replace(/\s+/g, '-').toLowerCase() === brandId
        //   )
        // }
        } else {
            var ref2;
            edges = ((ref2 = data.products) == null ? void 0 : ref2.edges) ?? [];
        }
        return {
            products: edges.map(({ node  })=>normalizeProduct(node)),
            found: !!edges.length
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
