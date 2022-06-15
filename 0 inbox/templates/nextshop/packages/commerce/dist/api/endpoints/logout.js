import { CommerceAPIError } from "../utils/errors";
import isAllowedOperation from "../utils/is-allowed-operation";
const logoutEndpoint = async (ctx)=>{
    const { req , res , handlers  } = ctx;
    if (!isAllowedOperation(req, res, {
        GET: handlers["logout"]
    })) {
        return;
    }
    try {
        const redirectTo = req.query.redirect_to;
        const body = typeof redirectTo === "string" ? {
            redirectTo
        } : {};
        return await handlers["logout"]({
            ...ctx,
            body
        });
    } catch (error) {
        console.error(error);
        const message = error instanceof CommerceAPIError ? "An unexpected error ocurred with the Commerce API" : "An unexpected error ocurred";
        res.status(500).json({
            data: null,
            errors: [
                {
                    message
                }
            ]
        });
    }
};
export default logoutEndpoint;
