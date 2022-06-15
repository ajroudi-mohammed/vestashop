import { requireConfigValue } from "../../isomorphic-config";
import Cookies from "js-cookie";
import UserTokenResponseParseError from "../../errors/UserTokenResponseParseError";
export const getUserTokenResponse = ()=>{
    const stringifiedToken = Cookies.get(requireConfigValue("userCookieName"));
    if (!stringifiedToken) {
        return undefined;
    }
    try {
        const token = JSON.parse(stringifiedToken);
        return token;
    } catch (parseError) {
        throw new UserTokenResponseParseError("Could not parse stored user token response.");
    }
};
/**
 * Retrieves the saved user token response. If the response fails json parsing,
 * removes the saved token and returns @type {undefined} instead.
 */ export const ensureUserTokenResponse = ()=>{
    try {
        return getUserTokenResponse();
    } catch (error) {
        if (error instanceof UserTokenResponseParseError) {
            removeUserTokenResponse();
            return undefined;
        }
        throw error;
    }
};
export const setUserTokenResponse = (token)=>{
    const cookieOptions = {
        expires: requireConfigValue("userCookieExpire")
    };
    Cookies.set(requireConfigValue("userCookieName"), JSON.stringify(token), cookieOptions);
};
export const removeUserTokenResponse = ()=>{
    Cookies.remove(requireConfigValue("userCookieName"));
};
