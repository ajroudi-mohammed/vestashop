import { useHook, useMutationHook } from "../utils/use-hook";
import { mutationFetcher } from "../utils/default-fetcher";
export const fetcher = mutationFetcher;
const fn = (provider)=>{
    var ref;
    return (ref = provider.checkout) == null ? void 0 : ref.useSubmitCheckout;
};
const useSubmitCheckout = (...args)=>{
    const hook = useHook(fn);
    return useMutationHook({
        fetcher,
        ...hook
    })(...args);
};
export default useSubmitCheckout;
