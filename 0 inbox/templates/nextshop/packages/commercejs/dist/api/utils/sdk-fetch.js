import { commerce } from "../../lib/commercejs";
// Calls the relevant Commerce.js SDK method based on resource and method arguments.
export default async function sdkFetch(resource, method, ...variables) {
    //@ts-ignore
    // Provider TODO: Fix types here.
    const data = await commerce[resource][method](...variables);
    return data;
};
