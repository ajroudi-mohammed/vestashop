import fetch from "./fetch";
// This object is persisted during development
const authCache = {};
class RuntimeMemCache {
    constructor(){}
    async getAuthTicket() {
        return authCache.kiboAuthTicket;
    }
    setAuthTicket(kiboAuthTicket) {
        authCache.kiboAuthTicket = kiboAuthTicket;
    }
}
export class APIAuthenticationHelper {
    constructor({ clientId ="" , sharedSecret ="" , authUrl =""  }, authTicketCache){
        this._clientId = clientId;
        this._sharedSecret = sharedSecret;
        this._authUrl = authUrl;
        if (!authTicketCache) {
            this._authTicketCache = new RuntimeMemCache();
        }
    }
    _buildFetchOptions(body = {}) {
        return {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        };
    }
    _calculateTicketExpiration(kiboAuthTicket) {
        //calculate how many milliseconds until auth expires
        const millisecsUntilExpiration = kiboAuthTicket.expires_in * 1000;
        kiboAuthTicket.expires_at = Date.now() + millisecsUntilExpiration;
        return kiboAuthTicket;
    }
    async authenticate() {
        // create oauth fetch options
        const options = this._buildFetchOptions({
            client_id: this._clientId,
            client_secret: this._sharedSecret,
            grant_type: "client_credentials"
        });
        // perform authentication
        const authTicket = await fetch(`${this._authUrl}/api/platform/applications/authtickets/oauth`, options).then((response)=>response.json());
        // set expiration time in ms on auth ticket
        this._calculateTicketExpiration(authTicket);
        // set authentication ticket on next server runtime object
        this._authTicketCache.setAuthTicket(authTicket);
        return authTicket;
    }
    async refreshTicket(kiboAuthTicket) {
        // create oauth refresh fetch options
        const options = this._buildFetchOptions({
            refreshToken: kiboAuthTicket == null ? void 0 : kiboAuthTicket.refresh_token
        });
        // perform auth ticket refresh
        const refreshedTicket = await fetch(`${this._authUrl}/api/platform/applications/authtickets/refresh-ticket`, options).then((response)=>response.json());
        return refreshedTicket;
    }
    async getAccessToken() {
        // get current Kibo API auth ticket
        let authTicket = await this._authTicketCache.getAuthTicket();
        // if no current ticket, perform auth
        // or if ticket expired, refresh auth
        if (!authTicket) {
            authTicket = await this.authenticate();
        } else if (authTicket.expires_at < Date.now()) {
            authTicket = await this.refreshTicket(authTicket);
        }
        return authTicket.access_token;
    }
}
