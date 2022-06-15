import { FetcherError } from "@vercel/commerce/utils/errors";
const fetchGraphqlApi = ()=>async ()=>{
        throw new FetcherError({
            errors: [
                {
                    message: "GraphQL fetch is not implemented"
                }
            ],
            status: 500
        });
    };
export default fetchGraphqlApi;
