import { FetcherError } from "@vercel/commerce/utils/errors";
export function getError(errors, status) {
    errors = errors ?? [
        {
            message: "Failed to fetch Saleor API"
        }
    ];
    return new FetcherError({
        errors,
        status
    });
}
export async function getAsyncError(res) {
    const data = await res.json();
    return getError(data.errors, res.status);
}
const handleFetchResponse = async (res)=>{
    if (res.ok) {
        const { data , errors  } = await res.json();
        if (errors && errors.length) {
            throw getError(errors, res.status);
        }
        return data;
    }
    throw await getAsyncError(res);
};
export default handleFetchResponse;
