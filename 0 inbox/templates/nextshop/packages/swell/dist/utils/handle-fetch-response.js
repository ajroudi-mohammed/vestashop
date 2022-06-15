import { CommerceError } from "@vercel/commerce/utils/errors";
const handleFetchResponse = async (res)=>{
    if (res) {
        if (res.error) {
            throw new CommerceError(res.error);
        }
        return res;
    }
};
export default handleFetchResponse;
