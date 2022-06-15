import useSearch from "@vercel/commerce/product/use-search";
import normalizeProduct from "../utils/normalizations/normalize-product";
import { requireConfigValue } from "../isomorphic-config";
const imagesSize = requireConfigValue("imagesSize");
const imagesQuality = requireConfigValue("imagesQuality");
const nextToSpreeSortMap = {
    "trending-desc": "available_on",
    "latest-desc": "updated_at",
    "price-asc": "price",
    "price-desc": "-price"
};
export const handler = {
    // Provide fetchOptions for SWR cache key
    fetchOptions: {
        url: "products",
        query: "list"
    },
    async fetcher ({ input , options , fetch  }) {
        // This method is only needed if the options need to be modified before calling the generic fetcher (created in createFetcher).
        console.info("useSearch fetcher called. Configuration: ", "input: ", input, "options: ", options);
        const taxons = [
            input.categoryId,
            input.brandId
        ].filter(Boolean);
        const filter = {
            filter: {
                ...taxons.length > 0 ? {
                    taxons: taxons.join(",")
                } : {},
                ...input.search ? {
                    name: input.search
                } : {}
            }
        };
        const sort = input.sort ? {
            sort: nextToSpreeSortMap[input.sort]
        } : {};
        const { data: spreeSuccessResponse  } = await fetch({
            variables: {
                methodPath: "products.list",
                arguments: [
                    {},
                    {
                        include: "primary_variant,variants,images,option_types,variants.option_values",
                        per_page: 50,
                        ...filter,
                        ...sort,
                        image_transformation: {
                            quality: imagesQuality,
                            size: imagesSize
                        }
                    }, 
                ]
            }
        });
        const normalizedProducts = spreeSuccessResponse.data.map((spreeProduct)=>normalizeProduct(spreeSuccessResponse, spreeProduct));
        const found = spreeSuccessResponse.data.length > 0;
        return {
            products: normalizedProducts,
            found
        };
    },
    useHook: ({ useData  })=>{
        const useWrappedHook = (input = {})=>{
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
                    // revalidateOnFocus: false means do not fetch products again when website is refocused in the web browser.
                    ...input.swrOptions
                }
            });
        };
        return useWrappedHook;
    }
};
export default useSearch;
