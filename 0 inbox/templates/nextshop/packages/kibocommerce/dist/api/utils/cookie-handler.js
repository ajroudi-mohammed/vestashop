import { getCookieExpirationDate } from "../../lib/get-cookie-expiration-date";
import { prepareSetCookie } from "../../lib/prepare-set-cookie";
import { setCookies } from "../../lib/set-cookie";
import getAnonymousShopperToken from "./get-anonymous-shopper-token";
const parseCookie = (cookieValue)=>{
    return cookieValue ? JSON.parse(Buffer.from(cookieValue, "base64").toString("ascii")) : null;
};
export default class CookieHandler {
    constructor(config, req, res){
        this.config = config;
        this.request = req;
        this.response = res;
        const encodedToken = req.cookies[config.customerCookie];
        const token = parseCookie(encodedToken);
        this.accessToken = token ? token.accessToken : null;
    }
    async getAnonymousToken() {
        const response = await getAnonymousShopperToken({
            config: this.config
        });
        let anonymousAccessToken = response == null ? void 0 : response.accessToken;
        return {
            response,
            accessToken: anonymousAccessToken
        };
    }
    isShopperCookieAnonymous() {
        const customerCookieKey = this.config.customerCookie;
        const shopperCookie = this.request.cookies[customerCookieKey];
        const shopperSession = parseCookie(shopperCookie);
        const isAnonymous = (shopperSession == null ? void 0 : shopperSession.customerAccount) ? false : true;
        return isAnonymous;
    }
    setAnonymousShopperCookie(anonymousShopperTokenResponse) {
        const cookieExpirationDate = getCookieExpirationDate(this.config.customerCookieMaxAgeInDays);
        const authCookie = prepareSetCookie(this.config.customerCookie, JSON.stringify(anonymousShopperTokenResponse), (anonymousShopperTokenResponse == null ? void 0 : anonymousShopperTokenResponse.accessTokenExpiration) ? {
            expires: cookieExpirationDate
        } : {});
        setCookies(this.response, [
            authCookie
        ]);
    }
    getAccessToken() {
        return this.accessToken;
    }
};
