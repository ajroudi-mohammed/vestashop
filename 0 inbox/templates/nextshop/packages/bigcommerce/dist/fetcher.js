import { FetcherError } from "@vercel/commerce/utils/errors";
async function getText(res) {
    try {
        return await res.text() || res.statusText;
    } catch (error) {
        return res.statusText;
    }
}
async function getError(res) {
    var ref;
    if ((ref = res.headers.get("Content-Type")) == null ? void 0 : ref.includes("application/json")) {
        const data = await res.json();
        return new FetcherError({
            errors: data.errors,
            status: res.status
        });
    }
    return new FetcherError({
        message: await getText(res),
        status: res.status
    });
}
const fetcher = async ({ url , method ="GET" , variables , body: bodyObj ,  })=>{
    const hasBody = Boolean(variables || bodyObj);
    const body = hasBody ? JSON.stringify(variables ? {
        variables
    } : bodyObj) : undefined;
    const headers = hasBody ? {
        "Content-Type": "application/json"
    } : undefined;
    const res = await fetch(url, {
        method,
        body,
        headers
    });
    if (res.ok) {
        const { data  } = await res.json();
        return data;
    }
    throw await getError(res);
};
export default fetcher;
