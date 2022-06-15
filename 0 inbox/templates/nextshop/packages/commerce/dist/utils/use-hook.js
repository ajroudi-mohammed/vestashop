import { useCallback } from "react";
import { useCommerce } from "..";
import useData from "./use-data";
export function useFetcher() {
    const { providerRef , fetcherRef  } = useCommerce();
    return providerRef.current.fetcher ?? fetcherRef.current;
}
export function useHook(fn) {
    const { providerRef  } = useCommerce();
    const provider = providerRef.current;
    return fn(provider);
}
export function useSWRHook(hook) {
    const fetcher = useFetcher();
    return hook.useHook({
        useData (ctx) {
            const response = useData(hook, (ctx == null ? void 0 : ctx.input) ?? [], fetcher, ctx == null ? void 0 : ctx.swrOptions);
            return response;
        }
    });
}
export function useMutationHook(hook) {
    const fetcher = useFetcher();
    return hook.useHook({
        fetch: useCallback(({ input  } = {})=>{
            return hook.fetcher({
                input,
                options: hook.fetchOptions,
                fetch: fetcher
            });
        }, [
            fetcher,
            hook.fetchOptions
        ])
    });
}
