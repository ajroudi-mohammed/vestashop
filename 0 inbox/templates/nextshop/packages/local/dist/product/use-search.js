import useSearch from "@vercel/commerce/product/use-search";
export default useSearch;
export const handler = {
    fetchOptions: {
        query: ""
    },
    async fetcher ({ input , options , fetch  }) {},
    useHook: ()=>()=>{
            return {
                data: {
                    products: []
                }
            };
        }
};
