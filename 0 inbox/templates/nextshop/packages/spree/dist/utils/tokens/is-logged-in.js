import { ensureUserTokenResponse } from "./user-token-response";
const isLoggedIn = ()=>{
    const userTokenResponse = ensureUserTokenResponse();
    return !!userTokenResponse;
};
export default isLoggedIn;
