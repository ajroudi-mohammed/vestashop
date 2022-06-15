import TokensNotRejectedError from "../../errors/TokensNotRejectedError";
const revokeUserTokens = async (fetch, userTokens)=>{
    const spreeRevokeTokensResponses = await Promise.allSettled([
        fetch({
            variables: {
                methodPath: "authentication.revokeToken",
                arguments: [
                    {
                        token: userTokens.refreshToken
                    }, 
                ]
            }
        }),
        fetch({
            variables: {
                methodPath: "authentication.revokeToken",
                arguments: [
                    {
                        token: userTokens.accessToken
                    }, 
                ]
            }
        }), 
    ]);
    const anyRejected = spreeRevokeTokensResponses.some((response)=>response.status === "rejected");
    if (anyRejected) {
        throw new TokensNotRejectedError("Some tokens could not be rejected in Spree.");
    }
    return undefined;
};
export default revokeUserTokens;
