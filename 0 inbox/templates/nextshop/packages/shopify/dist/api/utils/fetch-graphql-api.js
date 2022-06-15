import fetch from "./fetch";
import { API_URL, API_TOKEN } from "../../const";
import { getError } from "../../utils/handle-fetch-response";
const fetchGraphqlApi = async (query, { variables  } = {}, fetchOptions)=>{
    try {
        const res = await fetch(API_URL, {
            ...fetchOptions,
            method: "POST",
            headers: {
                "X-Shopify-Storefront-Access-Token": API_TOKEN,
                ...fetchOptions == null ? void 0 : fetchOptions.headers,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                query,
                variables
            })
        });
        const { data , errors , status  } = await res.json();
        if (errors) {
            throw getError(errors, status);
        }
        return {
            data,
            res
        };
    } catch (err) {
        throw getError([
            {
                message: `${err} \n Most likely related to an unexpected output. e.g the store might be protected with password or not available.`
            }, 
        ], 500);
    }
};
export default fetchGraphqlApi;
