import { useHook, useMutationHook } from "../utils/use-hook";
import { mutationFetcher } from "../utils/default-fetcher";
export const fetcher = mutationFetcher;
const fn = (provider)=>{
    var ref;
    return (ref = provider.cart) == null ? void 0 : ref.useUpdateItem;
};
const useUpdateItem = (input)=>{
    const hook = useHook(fn);
    return useMutationHook({
        fetcher,
        ...hook
    })(input);
};
export default useUpdateItem;
