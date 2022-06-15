import AccessTokenError from "../errors/AccessTokenError";
import RefreshTokenError from "../errors/RefreshTokenError";
const handleTokenErrors = (error, action)=>{
    if (error instanceof AccessTokenError || error instanceof RefreshTokenError) {
        action();
        return true;
    }
    return false;
};
export default handleTokenErrors;
