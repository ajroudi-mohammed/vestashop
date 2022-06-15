import convertSpreeErrorToGraphQlError from "./utils/convert-spree-error-to-graph-ql-error";
import { makeClient, errors } from "@spree/storefront-api-v2-sdk";
import { requireConfigValue } from "./isomorphic-config";
import getSpreeSdkMethodFromEndpointPath from "./utils/get-spree-sdk-method-from-endpoint-path";
import SpreeSdkMethodFromEndpointPathError from "./errors/SpreeSdkMethodFromEndpointPathError";
import createCustomizedFetchFetcher, { fetchResponseKey } from "./utils/create-customized-fetch-fetcher";
import ensureFreshUserAccessToken from "./utils/tokens/ensure-fresh-user-access-token";
import RefreshTokenError from "./errors/RefreshTokenError";
import prettyPrintSpreeSdkErrors from "./utils/pretty-print-spree-sdk-errors";
const client = makeClient({
    host: requireConfigValue("apiHost"),
    createFetcher: (fetcherOptions)=>{
        return createCustomizedFetchFetcher({
            fetch: globalThis.fetch,
            requestConstructor: globalThis.Request,
            ...fetcherOptions
        });
    }
});
const normalizeSpreeSuccessResponse = (storeResponse)=>{
    const data = storeResponse.success();
    const rawFetchResponse = data[fetchResponseKey];
    return {
        data,
        res: rawFetchResponse
    };
};
const fetcher = async (requestOptions)=>{
    const { url , method , variables , query  } = requestOptions;
    console.log("Fetcher called. Configuration: ", "url = ", url, "requestOptions = ", requestOptions);
    if (!variables) {
        throw new SpreeSdkMethodFromEndpointPathError(`Required FetcherVariables not provided.`);
    }
    const { methodPath , arguments: args , refreshExpiredAccessToken =true , replayUnauthorizedRequest =true ,  } = variables;
    if (refreshExpiredAccessToken) {
        await ensureFreshUserAccessToken(client);
    }
    const spreeSdkMethod = getSpreeSdkMethodFromEndpointPath(client, methodPath);
    const storeResponse = await spreeSdkMethod(...args);
    if (storeResponse.isSuccess()) {
        return normalizeSpreeSuccessResponse(storeResponse);
    }
    const storeResponseError = storeResponse.fail();
    if (storeResponseError instanceof errors.SpreeError && storeResponseError.serverResponse.status === 401 && replayUnauthorizedRequest) {
        console.info("Request ended with 401. Replaying request after refreshing the user token.");
        await ensureFreshUserAccessToken(client);
        const replayedStoreResponse = await spreeSdkMethod(...args);
        if (replayedStoreResponse.isSuccess()) {
            return normalizeSpreeSuccessResponse(replayedStoreResponse);
        }
        console.warn("Replaying the request failed", replayedStoreResponse.fail());
        throw new RefreshTokenError("Could not authorize request with current access token.");
    }
    if (storeResponseError instanceof errors.SpreeError) {
        console.error(`Request to spree resulted in an error:\n\n${prettyPrintSpreeSdkErrors(storeResponse.fail())}`);
        throw convertSpreeErrorToGraphQlError(storeResponseError);
    }
    throw storeResponseError;
};
export default fetcher;
