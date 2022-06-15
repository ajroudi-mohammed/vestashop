import { serialize } from "cookie";
import { getDeploymentUrl } from "../../../utils/get-deployment-url";
const login = async ({ req , res , config: { sdkFetch , customerCookie  } ,  })=>{
    const sdkFetcher = sdkFetch;
    const redirectUrl = getDeploymentUrl();
    try {
        var ref;
        const loginToken = (ref = req.query) == null ? void 0 : ref.token;
        if (!loginToken) {
            res.redirect(redirectUrl);
        }
        const { jwt  } = await sdkFetcher("customer", "getToken", loginToken, false);
        res.setHeader("Set-Cookie", serialize(customerCookie, jwt, {
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24,
            path: "/"
        }));
        res.redirect(redirectUrl);
    } catch  {
        res.redirect(redirectUrl);
    }
};
export default login;
