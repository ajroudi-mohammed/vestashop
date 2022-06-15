import { useHook, useMutationHook } from "../../utils/use-hook";
import { mutationFetcher } from "../../utils/default-fetcher";
export const fetcher = mutationFetcher;
const fn = (provider)=>{
    var ref, ref1;
    return (ref = provider.customer) == null ? void 0 : (ref1 = ref.address) == null ? void 0 : ref1.useRemoveItem;
};
const useRemoveItem = (input)=>{
    const hook = useHook(fn);
    return useMutationHook({
        fetcher,
        ...hook
    })(input);
};
export default useRemoveItem;
