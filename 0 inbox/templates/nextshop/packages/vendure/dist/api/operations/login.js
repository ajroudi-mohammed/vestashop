import { ValidationError } from "@vercel/commerce/utils/errors";
import { loginMutation } from "../../utils/mutations/log-in-mutation";
export default function loginOperation({ commerce  }) {
    async function login({ query =loginMutation , variables , res: response , config: cfg  }) {
        const config = commerce.getConfig(cfg);
        const { data , res  } = await config.fetch(query, {
            variables
        });
        switch(data.login.__typename){
            case "NativeAuthStrategyError":
            case "InvalidCredentialsError":
            case "NotVerifiedError":
                throw new ValidationError({
                    code: data.login.errorCode,
                    message: data.login.message
                });
        }
        return {
            result: data.login.id
        };
    }
    return login;
};
