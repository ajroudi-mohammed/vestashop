import useSWR from "swr";
import defineProperty from "./define-property";
import { CommerceError } from "./errors";
const useData = (options, input, fetcherFn, swrOptions)=>{
    const hookInput = Array.isArray(input) ? input : Object.entries(input);
    const fetcher = async (url, query, method, ...args)=>{
        try {
            return await options.fetcher({
                options: {
                    url,
                    query,
                    method
                },
                // Transform the input array into an object
                input: args.reduce((obj, val, i)=>{
                    obj[hookInput[i][0]] = val;
                    return obj;
                }, {}),
                fetch: fetcherFn
            });
        } catch (error) {
            // SWR will not log errors, but any error that's not an instance
            // of CommerceError is not welcomed by this hook
            if (!(error instanceof CommerceError)) {
                console.error(error);
            }
            throw error;
        }
    };
    const response = useSWR(()=>{
        const opts = options.fetchOptions;
        return opts ? [
            opts.url,
            opts.query,
            opts.method,
            ...hookInput.map((e)=>e[1])
        ] : null;
    }, fetcher, swrOptions);
    if (!("isLoading" in response)) {
        defineProperty(response, "isLoading", {
            get () {
                return response.data === undefined;
            },
            enumerable: true
        });
    }
    return response;
};
export default useData;
