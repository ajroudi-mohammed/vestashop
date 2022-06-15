export const fetcher = ()=>{
    return null;
};
export function extendHook(customFetcher, // swrOptions?: SwrOptions<Wishlist | null, UseWishlistInput>
swrOptions) {
    const useWishlist = ({ includeProducts  } = {})=>{
        return {
            data: null
        };
    };
    useWishlist.extend = extendHook;
    return useWishlist;
}
export default extendHook(fetcher);
