import { throwUserErrors } from "../../utils";
import * as Mutation from "../../utils/mutations";
export default function loginOperation({ commerce  }) {
    async function login({ query =Mutation.SessionCreate , variables , config  }) {
        config = commerce.getConfig(config);
        const { data: { customerAccessTokenCreate  } ,  } = await config.fetch(query, {
            variables
        });
        throwUserErrors(customerAccessTokenCreate == null ? void 0 : customerAccessTokenCreate.customerUserErrors);
        const customerAccessToken = customerAccessTokenCreate == null ? void 0 : customerAccessTokenCreate.customerAccessToken;
        const accessToken = customerAccessToken == null ? void 0 : customerAccessToken.accessToken;
        // if (accessToken) {
        //   setCustomerToken(accessToken)
        // }
        return {
            result: customerAccessToken == null ? void 0 : customerAccessToken.accessToken
        };
    }
    return login;
};
