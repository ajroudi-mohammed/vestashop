import { FetcherError } from "@vercel/commerce/utils/errors";
import fetch from "./fetch";
const fetchGraphqlApi = (getConfig)=>{
    return async (query, { variables , preview  } = {}, fetchOptions)=>{
        const config = getConfig();
        const res = await fetch(config.commerceUrl, {
            ...fetchOptions,
            method: "POST",
            headers: {
                ...fetchOptions == null ? void 0 : fetchOptions.headers,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                query,
                variables
            })
        });
        const json = await res.json();
        if (json.errors) {
            throw new FetcherError({
                errors: json.errors ?? [
                    {
                        message: "Failed to fetch for API"
                    }
                ],
                status: res.status
            });
        }
        return {
            data: json.data,
            res
        };
    };
};
export default fetchGraphqlApi;
