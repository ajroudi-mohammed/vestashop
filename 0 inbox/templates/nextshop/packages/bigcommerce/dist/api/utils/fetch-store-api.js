import { BigcommerceApiError, BigcommerceNetworkError } from "./errors";
import fetch from "./fetch";
const fetchStoreApi = (getConfig)=>{
    return async (endpoint, options)=>{
        const config = getConfig();
        let res;
        try {
            res = await fetch(config.storeApiUrl + endpoint, {
                ...options,
                headers: {
                    ...options == null ? void 0 : options.headers,
                    "Content-Type": "application/json",
                    "X-Auth-Token": config.storeApiToken,
                    "X-Auth-Client": config.storeApiClientId
                }
            });
        } catch (error) {
            throw new BigcommerceNetworkError(`Fetch to Bigcommerce failed: ${error.message}`);
        }
        const contentType = res.headers.get("Content-Type");
        const isJSON = contentType == null ? void 0 : contentType.includes("application/json");
        if (!res.ok) {
            const data = isJSON ? await res.json() : await getTextOrNull(res);
            const headers = getRawHeaders(res);
            const msg = `Big Commerce API error (${res.status}) \nHeaders: ${JSON.stringify(headers, null, 2)}\n${typeof data === "string" ? data : JSON.stringify(data, null, 2)}`;
            throw new BigcommerceApiError(msg, res, data);
        }
        if (res.status !== 204 && !isJSON) {
            throw new BigcommerceApiError(`Fetch to Bigcommerce API failed, expected JSON content but found: ${contentType}`, res);
        }
        // If something was removed, the response will be empty
        return res.status === 204 ? null : await res.json();
    };
};
export default fetchStoreApi;
function getRawHeaders(res) {
    const headers = {};
    res.headers.forEach((value, key)=>{
        headers[key] = value;
    });
    return headers;
}
function getTextOrNull(res) {
    try {
        return res.text();
    } catch (err) {
        return null;
    }
}
