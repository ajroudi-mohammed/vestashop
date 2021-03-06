import { prepareSetCookie } from "../../../lib/prepare-set-cookie";
import { setCookies } from "../../../lib/set-cookie";
const logout = async ({ res , body: { redirectTo  } , config ,  })=>{
    // Remove the cookie
    const authCookie = prepareSetCookie(config.customerCookie, "", {
        maxAge: -1,
        path: "/"
    });
    setCookies(res, [
        authCookie
    ]);
    // Only allow redirects to a relative URL
    if (redirectTo == null ? void 0 : redirectTo.startsWith("/")) {
        res.redirect(redirectTo);
    } else {
        res.status(200).json({
            data: null
        });
    }
};
export default logout;
