import { commerce } from "./lib/commercejs";
import { FetcherError } from "@vercel/commerce/utils/errors";
function isValidSDKQuery(query) {
    if (!query) return false;
    return query in commerce;
}
// Fetches from an API route within /api/endpoints directory
const customFetcher = async ({ method , url , body  })=>{
    const response1 = await fetch(url, {
        method,
        body: body ? JSON.stringify(body) : undefined,
        headers: {
            "Content-Type": "application/json"
        }
    }).then((response)=>response.json()).then((response)=>response.data);
    return response1;
};
const fetcher = async ({ url , query , method , variables , body  })=>{
    // If a URL is passed, it means that the fetch needs to be passed on to a custom API route.
    const isCustomFetch = !!url;
    if (isCustomFetch) {
        const data = await customFetcher({
            url,
            method,
            body
        });
        return data;
    }
    // Fetch using the Commerce.js SDK, but make sure that it's a valid method.
    if (!isValidSDKQuery(query)) {
        throw new FetcherError({
            errors: [
                {
                    message: `Query ${query} does not exist on Commerce.js SDK.`
                }, 
            ],
            status: 400
        });
    }
    const resource = commerce[query];
    if (!method || !resource[method]) {
        throw new FetcherError({
            errors: [
                {
                    message: `Method ${method} does not exist on Commerce.js SDK ${query} resource.`
                }, 
            ],
            status: 400
        });
    }
    const variablesArgument = Array.isArray(variables) ? variables : [
        variables
    ];
    const data = await resource[method](...variablesArgument);
    return data;
};
export default fetcher;
